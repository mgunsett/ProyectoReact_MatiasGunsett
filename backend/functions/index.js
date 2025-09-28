/*
  Firebase Cloud Function para enviar emails cuando una orden pasa a 'approved'.
  - Usa SendGrid (@sendgrid/mail)
  - Trigger: Firestore onUpdate en orders/{orderId}
  - Envia a: comprador y admin
  - Idempotencia: marca order.emailSent=true para evitar duplicados
*/

const functions = require('firebase-functions');

 

const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Inicializar Admin SDK (en entorno de Functions se usan credenciales por defecto)
try {
  admin.app();
} catch (e) {
  admin.initializeApp();
}

const db = admin.firestore();

// Config de SendGrid desde functions:config
// Comandos de ejemplo:
// firebase functions:config:set sendgrid.key="SG.xxxx" emails.from="BeReal Clothes <no-reply@berealclothes.com>" emails.admin="admin@tu-dominio.com"
const SENDGRID_KEY = (functions.config().sendgrid && functions.config().sendgrid.key) || process.env.SENDGRID_API_KEY;
const EMAIL_FROM = (functions.config().emails && functions.config().emails.from) || 'no-reply@berealclothes.com';
const EMAIL_ADMIN = (functions.config().emails && functions.config().emails.admin) || '';

// Normaliza el campo from para SendGrid a { email, name }
function parseFrom(fromStr) {
  if (!fromStr) return { email: 'no-reply@berealclothes.com' };
  // Soporta "Nombre <email@dominio>" o solo email
  const match = fromStr.match(/^(.*)<\s*([^>]+)\s*>\s*$/);
  if (match) {
    const name = match[1].trim().replace(/^"|"$/g, '');
    const email = match[2].trim();
    return name ? { email, name } : { email };
  }
  return { email: fromStr.trim() };
}

if (SENDGRID_KEY) {
  sgMail.setApiKey(SENDGRID_KEY);
} else {
  console.warn('[functions] No se encontró sendgrid.key en functions:config. El envío de emails fallará hasta configurarlo.');
}

// Helper: formatear items a HTML
function itemsToHtml(items = []) {
  const rows = items.map((it) => {
    const size = (it.selectedSize || '').toString().toUpperCase();
    const qty = it.quantity || it.qtyItem || 1;
    const price = typeof it.price === 'number' ? it.price : Number(it.price || 0);
    const subtotal = price * qty;
    return `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${it.title || it.productId}</td>
        <td style="padding:8px;border-bottom:1px solid #eee; text-align:center;">${size}</td>
        <td style="padding:8px;border-bottom:1px solid #eee; text-align:center;">${qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee; text-align:right;">$ ${price.toFixed(2)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee; text-align:right;">$ ${subtotal.toFixed(2)}</td>
      </tr>`;
  }).join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <thead>
        <tr>
          <th align="left" style="padding:8px;border-bottom:2px solid #000;">Producto</th>
          <th align="center" style="padding:8px;border-bottom:2px solid #000;">Talle</th>
          <th align="center" style="padding:8px;border-bottom:2px solid #000;">Cant.</th>
          <th align="right" style="padding:8px;border-bottom:2px solid #000;">Precio</th>
          <th align="right" style="padding:8px;border-bottom:2px solid #000;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>`;
}

function buildEmailHtml({ orderId, orderNumber, buyer, items, total, createdAt, forAdmin = false }) {
  const title = forAdmin ? 'Nueva venta aprobada' : 'Confirmación de compra';
  const intro = forAdmin
    ? 'Se aprobó una nueva orden de compra en BeReal Clothes:'
    : `Gracias por tu compra, ${buyer?.name || buyer?.displayName || ''}!`;

  const buyerInfoHtml = `
    <p><strong>Comprador:</strong> ${buyer?.name || buyer?.displayName || ''}</p>
    <p><strong>Email:</strong> ${buyer?.email || ''}</p>
  `;

  const dateStr = createdAt ? new Date(createdAt).toLocaleString('es-AR') : new Date().toLocaleString('es-AR');

  return `
    <div style="font-family:Arial, Helvetica, sans-serif; color:#111;">
      <h2>${title}</h2>
      <p>${intro}</p>
      <p><strong>N° de Orden:</strong> ${orderNumber || orderId}</p>
      <p><strong>ID de Orden:</strong> ${orderId}</p>
      <p><strong>Fecha:</strong> ${dateStr}</p>
      ${buyerInfoHtml}
      <div style="margin-top:16px;">
        ${itemsToHtml(items)}
      </div>
      <h3 style="text-align:right; margin-top:16px;">Total: $ ${Number(total || 0).toFixed(2)}</h3>
      <p style="margin-top:24px; font-size:12px; color:#555;">Este es un comprobante generado automáticamente.</p>
    </div>
  `;
}

exports.onOrderApprovedSendEmails = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data() || {};
    const after = change.after.data() || {};
    const orderId = context.params.orderId;

    // Disparar solo cuando paymentStatus cambia a 'approved'
    const beforeStatus = before.paymentStatus;
    const afterStatus = after.paymentStatus;

    console.log('[functions] Trigger orders onUpdate', { orderId, beforeStatus, afterStatus });

    if (beforeStatus === afterStatus) {
      // No hubo cambio en el estado de pago
      return null;
    }

    if (afterStatus !== 'approved') {
      // Solo actuamos en aprobados
      return null;
    }

    // Evitar duplicados si ya se envió
    if (after.emailSent === true) {
      console.log(`[functions] Orden ${orderId} ya tiene emailSent=true. Omitiendo.`);
      return null;
    }

    if (!SENDGRID_KEY) {
      console.error('[functions] SENDGRID_KEY no configurado (functions:config o env). Abortando envío de emails.');
      return null;
    }

    try {
      const order = after;
      const buyer = order.buyer || {};
      const items = order.items || [];
      const total = order.total || 0;
      const orderNumber = order.orderNumber || '';
      const createdAt = order.createdAt || '';

      const buyerEmail = buyer.email;
      if (!buyerEmail) {
        console.warn(`[functions] Orden ${orderId} no tiene buyer.email. No se enviará email al cliente.`);
      }

      const messages = [];

      // Email al cliente
      if (buyerEmail) {
        messages.push({
          to: buyerEmail,
          from: parseFrom(EMAIL_FROM),
          subject: `Tu compra fue aprobada - ${orderNumber || orderId}`,
          html: buildEmailHtml({ orderId, orderNumber, buyer, items, total, createdAt, forAdmin: false }),
        });
      }

      // Email al admin (si fue configurado)
      if (EMAIL_ADMIN) {
        messages.push({
          to: EMAIL_ADMIN,
          from: parseFrom(EMAIL_FROM),
          subject: `Nueva venta aprobada - ${orderNumber || orderId}`,
          html: buildEmailHtml({ orderId, orderNumber, buyer, items, total, createdAt, forAdmin: true }),
          replyTo: buyerEmail ? { email: buyerEmail } : undefined,
        });
      }

      if (messages.length === 0) {
        console.warn('[functions] No hay destinatarios configurados.');
        return null;
      }

      // Enviar emails (uno por mensaje para manejo de errores sencillo)
      let sentCount = 0;
      for (const msg of messages) {
        try {
          console.log('[functions] Enviando email', { to: msg.to, subject: msg.subject });
          await sgMail.send(msg);
          sentCount++;
        } catch (sendErr) {
          const body = sendErr?.response?.body;
          console.error('[functions] Error al enviar email a', msg.to, {
            message: sendErr.message,
            code: sendErr.code,
            body: body ? JSON.stringify(body) : undefined,
          });
          // continuamos con otros mensajes
        }
      }

      // Marcar la orden como emailSent=true solo si se envió al menos un correo
      if (sentCount > 0) {
        await change.after.ref.update({ emailSent: true, updatedAt: new Date().toISOString() });
        console.log(`[functions] Emails enviados para orden ${orderId} (sentCount=${sentCount})`);
      } else {
        console.warn(`[functions] Ningún email se pudo enviar para orden ${orderId}. No se marca emailSent.`);
      }
      return null;
    } catch (err) {
      console.error('[functions] Error enviando emails de orden aprobada:', err);
      // No marcamos emailSent para reintentos en próximo update o reintentos del sistema
      return null;
    }
  });
