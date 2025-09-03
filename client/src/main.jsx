import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { initMercadoPago } from '@mercadopago/sdk-react';

// Inicialización global de Mercado Pago (se ejecuta una vez)
const MP_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (!MP_PUBLIC_KEY) {
  console.error("VITE_MERCADOPAGO_PUBLIC_KEY no está definido en .env");
} else {
  initMercadoPago(MP_PUBLIC_KEY, {
    locale: 'es-AR',
    client: { sandbox: false },
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);