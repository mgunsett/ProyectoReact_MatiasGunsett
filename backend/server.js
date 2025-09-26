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
    console.log("Usando credenciales de Firebase desde GOOGLE_CREDENTIALS");
  } else {
    // En desarrollo, usar el archivo JSON
    serviceAccount = JSON.parse(fs.readFileSync("./be-real-matiasgunsett-firebase-adminsdk-m1ug4-089c9a7124.json", "utf-8"));
    console.log("Usando credenciales de Firebase desde archivo local");
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
  console.log("Firebase Admin inicializado correctamente");
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
      })
    );

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

