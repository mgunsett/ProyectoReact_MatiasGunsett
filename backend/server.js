// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago"; // Agregamos Payment

// Cargar variables de entorno
dotenv.config();
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);
// Inicializar Firebase Admin
try {
  initializeApp({
    // En Render, configura las credenciales de servicio de Google Cloud como una variable de entorno
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

    // Validar stock antes de crear la preferencia
    for (const item of preference.items) {
      const productRef = db
        .collection("products")
        .doc(item.metadata?.productId);
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
    }

    const preferenceObj = new Preference(client);

    console.log(
      "Preference enviada a MercadoPago:",
      JSON.stringify(preference, null, 2)
    );

    const result = await preferenceObj.create({ body: preference });
    res.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para el webhook de MercadoPago
app.post("/api/webhook/mercadopago", async (req, res) => {
  try {
    console.log("Webhook recibido:", req.body);
    const { type, data } = req.body;

    if (type === "payment") {
      const paymentInfo = await payment.get({ id: data.id });
      const orderId = paymentInfo.external_reference;
      const paymentStatus = paymentInfo.status;

      if (!orderId) {
        console.error("No se encontró external_reference en el pago:", data.id);
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

      if (paymentStatus === "approved" && !order.stockDecremented) {
        console.log("Pago aprobado. Actualizando stock para orden:", orderId);
        await db.runTransaction(async (transaction) => {
          for (const item of order.items) {
            const productRef = db.collection("products").doc(item.productId);
            const productDoc = await transaction.get(productRef);
            if (!productDoc.exists)
              throw new Error(`Producto ${item.productId} no existe.`);

            // Get the size stock field path
            const size = item.selectedSize.toUpperCase();
            const fieldPath = size;

            // Get current stock value
            const productData = productDoc.data();
            if (!productData || typeof productData !== "object") {
              throw new Error(
                `Error al obtener datos del producto ${item.title}`
              );
            }

            const currentStock = productData[size];
            if (currentStock === undefined) {
              throw new Error(
                `El producto ${item.title} no tiene stock configurado para el tamaño ${size}`
              );
            }

            if (currentStock < item.quantity) {
              throw new Error(
                `Stock insuficiente para ${item.title} talle ${size}. Stock disponible: ${currentStock}`
              );
            }

            // Update the stock for the specific size
            transaction.update(productRef, {
              [fieldPath]: currentStock - item.quantity,
            });
            console.log(
              `Stock actualizado para ${item.title} talle ${size}: ${
                currentStock - item.quantity
              }`
            );
          }
          // Marcar la orden para no descontar el stock dos veces
          transaction.update(orderRef, { stockDecremented: true });
        });
        console.log("Stock actualizado para orden:", orderId);
      }
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
/*
// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-3383355378043000-122110-2b2b6e4590b3272b27ca5a06417e019d-2170936801",
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Control de que esta funcionando el servidor
app.get("/", (req, res) => {
  res.send("Servidor de Mercado Pago");
});

// Ruta para crear una preferencia
app.post("/create_preference", async (req, res) => {
  const { items, pa yer } = req.body;

  const body = {
    items: items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      currency_id: "ARS",
      unit_price: item.unit_price,
    })),
    payer: {
      name: payer.name,
      email: payer.email,
    },

    back_urls: {
      success: "https://www.google.com/",
      failure: "https://www.instagram.com/",
      pending: "https://www.linkedin.com/feed/",
    },
    auto_return: "approved",
  };

  try {
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).send("Error al crear la preferencia");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
*/
