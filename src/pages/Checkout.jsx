import React, { useState } from "react";
import { CartDetails } from "../components/CartDetails";
import { Payment } from "./Payment"; // Importamos el componente de Payment
import { Box } from "@chakra-ui/react";
import './Styles/Checkout.css';

export const Checkout = () => {

  const [showPayment, setShowPayment] = useState(false);
   // Estado para mostrar/ocultar el componente Payment

  const handleContinuePurchase = () => {
    setShowPayment(true); // Mostramos el Payment al hacer click en "Continuar Compra"
  };
  const handleBackToCheckout = () => {
    setShowPayment(false); // Oculta Payment y muestra Checkout
  };

  return (
    <Box position="relative" height="100vh">
      {/* Difuminamos el contenido de CartDetails cuando se muestre Payment */}
      <Box
        opacity={showPayment ? 0.2 : 1}
        transition="opacity 0.5s ease"
      >
        <CartDetails onContinue={handleContinuePurchase} /> {/* Pasamos la función como prop */}
      </Box>

      {showPayment && (
        <Box 
        className="payment-box"
        transition="opacity 0.5s ease, transform 0.5s ease"
        transform={showPayment ? "translateY(0)" : "translateY(100%)"}
        opacity={showPayment ? 1 : 0}
        >
          <Payment onBack={handleBackToCheckout} />
        </Box>
      )}
    </Box>
  );
};
