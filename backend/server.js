app.post("/api/webhook/mercadopago", async (req, res) => {
  try {
    const { data } = req.body;
    const orderId = data.external_reference;
    const paymentStatus = data.status;

    // 1. Obtener la orden de Firestore
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    
    if (!orderDoc.exists) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    // 2. Solo si el pago es aprobado, actualizar stock
    if (paymentStatus === "approved") {
      const order = orderDoc.data();
      
      // Usar una transacción para asegurar consistencia
      await db.runTransaction(async (transaction) => {
        for (const item of order.items) {
          const productRef = db.collection("products").doc(item.productId);
          const productDoc = await transaction.get(productRef);
          
          if (!productDoc.exists) continue;

          const size = item.selectedSize.toUpperCase();
          const currentStock = productDoc.data().sizesStock?.sizes?.[size] || 0;
          
          // Actualizar stock restando la cantidad comprada
          transaction.update(productRef, {
            [`sizesStock.sizes.${size}`]: currentStock - item.quantity
          });
        }
      });
    }

    // 3. Actualizar estado del pago en la orden
    await orderRef.update({ 
      paymentStatus,
      updatedAt: new Date().toISOString() 
    });

    res.status(200).json({ success: true });
    
  } catch (error) {
    console.error("Error en webhook:", error);
    res.status(500).json({ error: error.message });
  }
});

/*
// Ruta para el webhook de MercadoPago
app.post("/api/webhook/mercadopago", async (req, res) => {
  try {
    const notification = req.body;
    const orderId = notification.external_reference;
    const paymentStatus = notification.data.status;

    console.log("Webhook recibido:", {
      orderId,
      paymentStatus,
      notification
    });

    // Obtener la orden completa
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    
    if (!orderDoc.exists) {
      console.error("Orden no encontrada:", orderId);
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    const order = orderDoc.data();

    // Actualizar el estado de la orden
    await orderRef.update({
      paymentStatus: paymentStatus,
      updatedAt: new Date().toISOString()
    });

    // Si el pago es aprobado, actualizar el stock
    if (paymentStatus === "approved") {
      console.log("Pago aprobado para orden:", orderId);

      // Actualizar el stock para cada item
      for (const item of order.items) {
        console.log("Procesando item:", item);
        
        // Verificar que el tamaño esté en mayúsculas
        const size = item.selectedSize.toUpperCase();
        
        // Actualizar el stock usando una transacción
        await db.runTransaction(async (transaction) => {
          const productRef = db.collection("products").doc(item.productId);
          const productDoc = await transaction.get(productRef);
          
          if (!productDoc.exists) {
            console.error(`Producto no encontrado: ${item.productId}`);
            throw new Error(`Producto ${item.productId} no encontrado`);
          }

          const productData = productDoc.data();
          const sizes = productData.sizesStock?.sizes || {};

          // Verificar si el tamaño existe
          if (!sizes[size]) {
            console.error(`Tamaño no encontrado: ${size} en producto ${item.productId}`);
            throw new Error(`Tamaño ${size} no disponible en producto ${item.productId}`);
          }

          // Verificar stock suficiente
          if (sizes[size] < item.quantity) {
            console.error(`Stock insuficiente para ${size} en producto ${item.productId}`);
            throw new Error(`Stock insuficiente para ${size} en producto ${item.productId}`);
          }

          // Actualizar el stock
          sizes[size] = sizes[size] - item.quantity;

          transaction.update(productRef, {
            'sizesStock.sizes': sizes
          });
        });
      }
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error en webhook:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Error procesando notificación",
      details: error.message
    });
  }
});
*/
//!----------------------------------------------------------
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