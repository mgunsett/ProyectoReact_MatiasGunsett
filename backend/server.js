// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-3383355378043000-122110-2b2b6e4590b3272b27ca5a06417e019d-2170936801",
});

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Control de que esta funcionando el servidor
app.get("/", (req, res) => {
  res.send("Servidor de Mercado Pago");
});

// Ruta para crear una preferencia
app.post("/create_preference", async (req, res) => {
  const { items, payer } = req.body;

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
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
