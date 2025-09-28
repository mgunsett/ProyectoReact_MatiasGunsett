// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";
import { getFirestore } from "firebase-admin/firestore";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago"; // Agregamos Payment
import compression from "compression";


// Cargar variables de entorno
dotenv.config();

// Configurar credenciales de Firebase para desarrollo y producción
let serviceAccount;
try {
  if (process.env.GOOGLE_CREDENTIALS) {
    // En producción, usar la variable GOOGLE_CREDENTIALS
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  } else {
    // En desarrollo, usar el archivo JSON
    serviceAccount = JSON.parse(fs.readFileSync("./be-real-matiasgunsett-firebase-adminsdk-m1ug4-089c9a7124.json", "utf-8"));
  }
} catch (error) {
  console.error("Error al cargar credenciales de Firebase:", error.message);
  process.exit(1);
}

// Inicializar Firebase Admin
try {
  initializeApp({
    credential: cert(serviceAccount), 
  });
} catch (e) {
  console.log("Firebase ya inicializado o error en credenciales:", e.message);
}
const db = getFirestore();

// Configurar cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});
const payment = new Payment(client);

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(
  cors({
    origin: ["https://berealclothes.netlify.app", "http://localhost:5173"],
  })
);

// --- RUTAS ---

// Ruta de prueba para verificar que el servidor está vivo
app.get("/", (req, res) => {
  res.send("Servidor de BeReal Clothes funcionando.");
});

// Ruta de pre-warm para reducir cold starts (Render/Firestore)
app.get("/warm", async (req, res) => {
  try {
    // Ping muy liviano a Firestore para calentar conexión
    await db.listCollections();
    res.status(200).send("warm-ok");
  } catch (e) {
    console.error("Warmup error:", e.message);
    // Aun si falla, devolvemos 200 para no bloquear al cliente
    res.status(200).send("warm-error");
  }
});

// Ruta de debug para verificar la estructura de los productos
app.get("/debug/products", async (req, res) => {
  try {
    const products = await db.collection("products").get();
    const productsData = products.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    res.json({ products: productsData });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Ruta para crear la preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { preference } = req.body;
    if (
      !preference ||
      !preference.items ||
      !preference.payer ||
      !preference.external_reference
    ) {
      return res
        .status(400)
        .json({ error: "Datos de preferencia incompletos." });
    }

    // Validar stock antes de crear la preferencia (en paralelo)
    await Promise.all(
      preference.items.map(async (item) => {
        const productRef = db.collection("products").doc(item.metadata?.productId);
        const productDoc = await productRef.get();

        if (!productDoc.exists) {
          throw new Error(`El producto ${item.metadata?.productId} no existe`);
        }

        const productData = productDoc.data();
        const size = item.metadata?.selectedSize?.toUpperCase();

        // Verificar si el tamaño existe y tiene stock
        if (!productData || typeof productData !== "object") {
          throw new Error(
            `Error al obtener datos del producto ${item.metadata?.productId}`
          );
        }

        const currentStock = productData[size];

        if (currentStock === undefined) {
          throw new Error(
            `El producto ${item.metadata?.productId} no tiene stock configurado para el tamaño ${size}`
          );
        }

        if (currentStock < item.quantity) {
          throw new Error(
            `No hay suficiente stock para el producto ${item.metadata?.productId} (Talle: ${size}). Stock disponible: ${currentStock}`
          );
        }
      })
    );

    const preferenceObj = new Preference(client);

    // Asegurar que la preferencia tenga notification_url para recibir webhooks
    try {
      const defaultWebhook = "https://proyectoreact-matiasgunsett.onrender.com/api/webhook/mercadopago";
      const webhookUrl = process.env.MP_WEBHOOK_URL || defaultWebhook;
      if (!preference.notification_url) {
        preference.notification_url = webhookUrl;
      }
      console.log("notification_url de la preferencia:", preference.notification_url);
    } catch (e) {
      console.warn("No se pudo establecer notification_url en la preferencia:", e.message);
    }

    console.log(
      "Preference enviada a MercadoPago:",
      JSON.stringify(preference, null, 2)
    );

    const result = await preferenceObj.create({ body: preference });
    res.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
  }
});

// Ruta para el webhook de MercadoPago
app.post("/api/webhook/mercadopago", async (req, res) => {
  try {
    console.log("Webhook recibido:", { body: req.body, query: req.query });
    const { type, data } = req.body || {};

    // Determinar paymentId soportando distintos formatos de notificación de MP
    let paymentId;
    if (type === "payment" && data?.id) {
      paymentId = data.id;
    } else if (req.query && req.query.type === "payment" && req.query["data.id"]) {
      paymentId = req.query["data.id"]; // algunos envíos usan data.id en query
    } else if (req.query && req.query.topic === "payment" && req.query.id) {
      paymentId = req.query.id; // formato clásico: ?topic=payment&id=123
    }

    if (!paymentId) {
      console.warn("Webhook sin paymentId reconocible. body:", req.body, "query:", req.query);
      return res.status(200).send("OK (sin paymentId)");
    }

    // Obtener info del pago y actualizar la orden
    const paymentInfo = await payment.get({ id: paymentId });
    const orderId = paymentInfo.external_reference;
    const paymentStatus = paymentInfo.status;

    if (!orderId) {
      console.error("No se encontró external_reference en el pago:", paymentId);
      return res.status(200).send("OK (sin external_reference)");
    }

    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      console.error("Orden no encontrada:", orderId);
      return res.status(404).send("Orden no encontrada");
    }

    const order = orderDoc.data();
    await orderRef.update({
      paymentStatus,
      updatedAt: new Date().toISOString(),
    });

    if (paymentStatus === "approved") {
      console.log("Pago aprobado. Actualizando stock para orden:", orderId);
      await db.runTransaction(async (transaction) => {
        // Leer la orden dentro de la transacción para garantizar idempotencia
        const freshOrderDoc = await transaction.get(orderRef);
        if (!freshOrderDoc.exists) throw new Error(`Orden ${orderId} no existe.`);
        const freshOrder = freshOrderDoc.data();
        if (freshOrder.stockDecremented) {
          console.log("Orden ya tenía stockDecremented=true. Omitiendo actualización de stock:", orderId);
          return;
        }

        for (const item of (freshOrder.items || [])) {
          const productRef = db.collection("products").doc(item.productId);
          const productDoc = await transaction.get(productRef);
          if (!productDoc.exists) throw new Error(`Producto ${item.productId} no existe.`);

          const size = (item.selectedSize || "").toString().toUpperCase();
          const productData = productDoc.data();
          if (!productData || typeof productData !== "object") {
            throw new Error(`Error al obtener datos del producto ${item.title}`);
          }

          const currentStock = productData[size];
          if (currentStock === undefined) {
            throw new Error(`El producto ${item.title} no tiene stock configurado para el tamaño ${size}`);
          }

          if (currentStock < item.quantity) {
            throw new Error(`Stock insuficiente para ${item.title} talle ${size}. Stock disponible: ${currentStock}`);
          }

          transaction.update(productRef, { [size]: currentStock - item.quantity });
          console.log(`Stock actualizado para ${item.title} talle ${size}: ${currentStock - item.quantity}`);
        }
        // Marcar la orden para no descontar el stock dos veces
        transaction.update(orderRef, { stockDecremented: true });
      });
      console.log("Stock actualizado (idempotente) para orden:", orderId);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error en webhook:", error);
    res.status(500).json({ error: "Error procesando webhook." });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
