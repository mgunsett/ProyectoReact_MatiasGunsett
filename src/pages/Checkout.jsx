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
        opacity={showPayment ? 0.5 : 1}
        transition="opacity 0.5s ease"
        flex="1"
      >
        <CartDetails onContinue={handleContinuePurchase} />
      </Box>
      {showPayment && (
        <Box className="payment-box animated">
          <Payment onBack={handleBackToCheckout} />
        </Box>
      )}
    </Box>
  );
};
