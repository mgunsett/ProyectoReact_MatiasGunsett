import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    VStack,
    HStack,
    Spacer,
    Alert,
    AlertIcon,
    useToast,
    Icon
  } from "@chakra-ui/react";
  import { CloseIcon } from '@chakra-ui/icons';
  import { useContext, useEffect, useState } from "react";
  import { CartContext } from "../context";
  import { db } from "../firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
  import { useAuth } from "../context/AuthContext";
  import './Styles/Payment.css';
  import axios from "axios";
  
  export const Payment = ({ onBack }) => {
    const { user } = useAuth();
    const toast = useToast();
    const [preferenceId, setPreferenceId] = useState(null);
    const { cartState } = useContext(CartContext);z
    const total = cartState.reduce((acc, item) => acc + item.price * item.qtyItem, 0);
    const MP_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;
  
    // Bloquear scroll del body
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);
  
    // Inicializar MercadoPago
    useEffect(() => {
      if (MP_PUBLIC_KEY) {
        initMercadoPago(MP_PUBLIC_KEY, {
          locale: 'es-AR',
          client: {
            sandbox: false
          }
        });
      } else {
        console.error("La clave pública de Mercado Pago no está definida.");
      }
    }, [MP_PUBLIC_KEY]);
  
    // Crear orden y preferencia
    const createOrderAndPreference = async () => {
      if (!user) {
        toast({
          title: 'Usuario no autenticado.',
          description: 'Por favor, inicie sesión para continuar con el pago.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
  
      try {
        // Verificar stock antes de crear la orden
        for (const item of cartState) {
          const productRef = db.doc(`products/${item.id}`);
          const productDoc = await productRef.get();
          if (!productDoc.exists) {
            throw new Error(`El producto ${item.id} no existe`);
          }
          const productData = productDoc.data();
          const currentStock = productData.sizesStock?.sizes?.[item.selectedSize.toUpperCase()] || 0;
          if (currentStock < item.qtyItem) {
            throw new Error(`No hay suficiente stock para el producto ${item.id}`);
          }
        }
  
        // Crear la orden en Firestore
        const orderObj = {
          buyer: {
            name: user.displayName,
            email: user.email,
          },
          items: cartState.map(item => ({
            productId: item.id,
            title: item.title,
            selectedSize: item.selectedSize.toUpperCase(),
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: item.qtyItem,
          })),
          total: total,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
          orderNumber: `ORD-${Date.now()}`
        };
  
        const ordersCollection = collection(db, "orders");
        const orderDoc = await addDoc(ordersCollection, orderObj);
  
        // Crear preferencia de pago
        const preference = {
          items: orderObj.items.map(item => ({
            title: item.title,
            quantity: item.quantity,
            currency_id: "ARS",
            unit_price: item.price,
          })),
          payer: {
            name: user.displayName,
            email: user.email,
          },
          back_urls: {
            success: `[https://berealclothes.netlify.app/`](https://berealclothes.netlify.app/`),
            failure: `[https://berealclothes.netlify.app/checkout`](https://berealclothes.netlify.app/checkout`),
            pending: `[https://berealclothes.netlify.app/checkout`](https://berealclothes.netlify.app/checkout`),
          },
          external_reference: orderDoc.id,
          auto_return: "approved"
        };
  
        // Crear preferencia en el backend
        const response = await axios.post('https://proyectoreact-matiasgunsett.onrender.com/create_preference', {
          preference
        });
  
        const { id } = response.data;
        setPreferenceId(id);
  
        toast({
          title: 'Su pedido se realizó con éxito!',
          description: `Su número de orden es: ${orderDoc.id}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        toast({
          title: 'Error al procesar el pago',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };
  
    // Iniciar pago cuando hay items en el carrito
    useEffect(() => {
      if (!preferenceId && cartState.length > 0) {
        createOrderAndPreference();
      }
    }, [preferenceId, cartState]);
  
    return (
      <Box className="container-payment" marginTop={16}>
        <Box className="header-payment">
          <Text className="title">Realizar Pedido</Text>
          <Icon
            as={CloseIcon}
            onClick={onBack}
            color={"white"}
            _hover={{
              cursor: "pointer",
              color: "red.500",
            }}
          />
        </Box>
        <Box h={"60vh"} overflowY="auto" mt={4} mb={2} p={4}>
          {cartState.length === 0 ? (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              Tu carrito está vacío.
            </Alert>
          ) : (
            <VStack spacing={2} align="normal" w={"100%"}>
              {cartState.map((item) => (
                <Flex
                  key={item.id + item.selectedSize}
                  p={2}
                  alignItems="center"
                  boxShadow="sm"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                    mr={4}
                  />
                  <Box maxW="sm" className="item-info-payment">
                    <Text fontSize="lg" fontWeight="bold" color={"white"}>
                      {item.title}
                    </Text>
                    <Text color={"white"}>Talle: {item.selectedSize}</Text>
                    <HStack spacing={4} mt={2}>
                      <Text color={"white"}>Precio: ${item.price.toFixed(2)}</Text>
                    </HStack>
                  </Box>
                  <Spacer />
                </Flex>
              ))}
              <Flex m={"20px 0"} justifyContent="space-between" alignItems="center">