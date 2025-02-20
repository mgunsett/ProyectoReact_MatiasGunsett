import { useState,useEffect } from "react";
import { CartDetails, SignIn } from "../components"
import { Payment } from "./Payment";
import { Box, Flex, Divider, Stack } from "@chakra-ui/react";
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
    <Box 
      position="relative" 
      height="100vh" 
      paddingTop={20}
      marginTop={-16}
      backgroundColor={('gray.200', 'gray.700')}
    >
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={'center'}
        p={2}
        alignItems={'center'}
      >
        <SignIn />
        <Stack direction='row' h='600px' p={4}>
        <Divider orientation='vertical' />
        </Stack>
        <Box
        opacity={showPayment ? 0.5 : 1}
        transition="opacity 0.5s ease"
        w={'50%'}
        >
          <CartDetails onContinue={handleContinuePurchase} />
        </Box>
      </Flex>
      {showPayment && (
        <Box className="payment-box animated">
          <Payment onBack={handleBackToCheckout} />
        </Box>
      )}
    </Box>
  );  
};

// const [isModalOpen, setIsModalOpen] = useState(false);
//? Función para cerrar el modal cuando se presiona la tecla ESC
//   const handleKeyDown = (e) => {
//     if (e.key === "Escape") {
//       setIsModalOpen(false);
//     }
//   };
//? Efecto para escuchar el evento del teclado
//    useEffect(() => {
//     if (isModalOpen) {
//       window.addEventListener("keydown", handleKeyDown);
//     } else {
//       window.removeEventListener("keydown", handleKeyDown);
//     }
//? Cleanup
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isModalOpen]);
  // Función para cerrar el modal cuando se hace click fuera de él

