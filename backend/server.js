// Ruta para el webhook de MercadoPago
app.post("/api/webhook/mercadopago", async (req, res) => {
  try {
    const { data } = req.body; // MercadoPago envía los datos en data
    const orderId = data.external_reference;
    const paymentStatus = data.status;

    console.log("Webhook recibido:", {
      orderId,
      paymentStatus,
      data: req.body
    });

    // 1. Obtener la orden completa de Firestore
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    
    if (!orderDoc.exists) {
      console.error("Orden no encontrada:", orderId);
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    const order = orderDoc.data();

    // 2. Actualizar el estado de la orden
    await orderRef.update({
      paymentStatus,
      updatedAt: new Date().toISOString()
    });

    // 3. Si el pago es aprobado, actualizar el stock
    if (paymentStatus === "approved") {
      console.log("Iniciando actualización de stock para orden:", orderId);
        
      // Actualizar el stock usando una transacción
      await db.runTransaction(async (transaction) => {
        for (const item of order.items) {
        const productRef = db.collection("products").doc(item.productId);
        const productDoc = await transaction.get(productRef);
          
        if (!productDoc.exists) {
          console.error(`Producto no encontrado: ${item.productId}`);
          throw new Error(`Producto ${item.productId} no encontrado`);
        }

        const size = item.selectedSize.toUpperCase();
        const fieldPath = `sizesStock.sizes.${size}`;
        const currentStock = productDoc.data().sizesStock?.sizes?.[size] || 0;

        if (currentStock < item.quantity) {
          console.error(`Stock insuficiente para ${size} en producto ${item.productId}`);
          throw new Error(`Stock insuficiente para ${size} en producto ${item.productId}`);
        }

        // Actualizar el stock restando la cantidad comprada
        transaction.update(productRef, {
          [fieldPath]: currentStock - item.quantity
        });
        
        console.log(`Stock actualizado: Producto ${item.productId}, Talle ${size}, Nuevo stock: ${currentStock - item.quantity}`);
          }
        });
    
        console.log("Stock actualizado exitosamente para orden:", orderId);
      }

      res.status(200).json({ success: true });
      
    } catch (error) {
      console.error("Error en webhook:", error);
      console.error("Stack trace:", error.stack);
  
      // Revertir cambios si es necesario
      if (error.message.includes("Stock insuficiente")) {
        // Aquí podrías actualizar el estado de la orden a "failed" o similar
        console.error("Revertiendo cambios por stock insuficiente");
      }
  
      res.status(500).json({ 
        error: "Error procesando notificación",
        details: error.message 
      });
    }
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