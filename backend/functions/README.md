# Cloud Functions: Envío de emails con SendGrid

Este módulo de Firebase Cloud Functions envía correos electrónicos al **cliente** y al **admin** cuando una orden (`orders/{orderId}`) pasa a estado de pago `approved`.

Archivos clave:
- `backend/functions/index.js`: Trigger `onUpdate` sobre `orders/{orderId}` que envía emails y marca `emailSent=true`.
- `backend/functions/package.json`: Dependencias y scripts.

## Requisitos
- Proyecto Firebase configurado y autenticado con Firebase CLI.
- API Key de SendGrid.
- Node 18+ en Functions (ya configurado en `package.json`).

## Configuración
1) Instalar dependencias de Functions (en carpeta `backend/functions/`):

```
npm install
```

2) Configurar variables de entorno de Functions:

```
firebase functions:config:set \
  sendgrid.key="SG.xxxxxx_tu_api_key" \
  emails.from="BeReal Clothes <no-reply@berealclothes.com>" \
  emails.admin="admin@tu-dominio.com"
```

- `sendgrid.key`: tu API key de SendGrid.
- `emails.from`: remitente (puedes usar un sender verificado en SendGrid).
- `emails.admin`: correo del administrador que recibirá la notificación de venta.

Puedes verificar lo configurado con:

```
firebase functions:config:get
```

3) Despliegue de Cloud Functions:

Desde `backend/` o directamente desde esta carpeta:

```
firebase deploy --only functions
```

Si quieres probar en emulador local:

```
firebase emulators:start --only functions
```

> Nota: Para que el trigger funcione en local con Firestore, ejecuta el emulador de Firestore también y crea/actualiza documentos en `orders`.

## Cómo funciona
- El frontend crea un documento en `orders` con estructura similar a:

```json
{
  "buyer": { "name": "Nombre", "email": "cliente@example.com" },
  "items": [
    { "productId": "123", "title": "Remera X", "selectedSize": "M", "price": 1000, "quantity": 2 }
  ],
  "total": 2000,
  "paymentStatus": "pending",
  "createdAt": "2025-09-26T00:00:00.000Z",
  "orderNumber": "ORD - 1695690000000"
}
```

- El backend (webhook de MercadoPago en `backend/server.js`) actualiza `paymentStatus` a `approved` cuando el pago se aprueba.
- La Function se dispara sólo cuando `paymentStatus` cambia a `approved` (comparando before/after) y si `emailSent` no está en `true`.
- Envía los emails (SendGrid) y marca `emailSent: true` para evitar duplicados.

## Personalización
- Edita el HTML del correo en `buildEmailHtml()` dentro de `index.js`.
- Cambia remitente/administrador con `functions:config:set` sin necesidad de redeploy del código.

## Problemas frecuentes
- Si no configuraste `sendgrid.key`, verás un warning y no se enviarán emails.
- Asegúrate de verificar el dominio/remitente en SendGrid para evitar bloqueos.
- Si no hay `buyer.email` en la orden, no se enviará email al cliente (pero sí al admin, si está configurado).
