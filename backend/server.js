// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Firebase Admin
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

// Configuración de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});
//|| "APP_USR-3383355378043000-122110-2b2b6e4590b3272b27ca5a06417e019d-2170936801",

// Inicializar Firebase
initializeApp();
const db = getFirestore();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
// Configurar CORS para permitir peticiones desde tu frontend
app.use(cors({
  origin: ['https://berealclothes.netlify.app', 'http://localhost:3000'], // Agrega aquí los dominios permitidos
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Control de que está funcionando el servidor
app.get("/", (req, res) => {
  res.send("Servidor de Mercado Pago");
});

// Ruta para crear una preferencia
app.post("/create_preference", async (req, res) => {
  try {
    console.log("Recibida preferencia:", req.body.preference);
    
    const { preference } = req.body;
    
    // Validar que la preferencia tenga los campos necesarios
    if (!preference || !preference.items || !preference.payer) {
      return res.status(400).json({
        error: "Faltan campos requeridos en la preferencia"
      });
    }
    // Crear la preferencia con los datos recibidos
    const body = {
      ...preference,
      back_urls: {
        success: preference.back_urls.success,
        failure: preference.back_urls.failure,
        pending: preference.back_urls.pending,
      },
      auto_return: "approved",
    };

    console.log("Cuerpo de preferencia:", body);

    const preferenceObj = new Preference(client);
    const result = await preferenceObj.create({ body });

    console.log("Preferencia creada:", result);

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Error al crear la preferencia",
      details: error.message
    });
  }
});

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

    // Actualizar el estado de la orden en Firestore
    const orderRef = db.collection("orders").doc(orderId);
    await orderRef.update({
      paymentStatus: paymentStatus,
      updatedAt: new Date().toISOString()
    });

    // Si el pago es aprobado, enviar notificación al usuario
    if (paymentStatus === "approved") {
      console.log("Pago aprobado para orden:", orderId);
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error en webhook:", error);
    res.status(500).json({ error: "Error procesando notificación" });
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