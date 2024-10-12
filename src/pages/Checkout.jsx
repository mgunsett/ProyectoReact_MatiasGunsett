import React, { useState } from "react";
import { CartDetails } from "../components/CartDetails";
import { Payment } from "./Payment";
import { Box } from "@chakra-ui/react";
import './Styles/Checkout.css';

export const Checkout = () => {

  const [showPayment, setShowPayment] = useState(false);

  const handleContinuePurchase = () => {
    setShowPayment(true);
  };
  const handleBackToCheckout = () => {
    setShowPayment(false);
  };

  return (
    <Box position="relative" height="100vh">
      <Box
        opacity={showPayment ? 0.2 : 1}
        transition="opacity 0.5s ease"
      >
        <CartDetails onContinue={handleContinuePurchase} />
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
