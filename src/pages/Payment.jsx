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
import { CloseIcon } from '@chakra-ui/icons'
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import './Styles/Payment.css';
 
export const Payment = ({ onBack }) => {
  // Al montar el componente, bloqueamos el scroll del body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
    // Al desmontar el componente, restauramos el scroll
      document.body.style.overflow = "unset";
    };
  }, []);

    const toast = useToast();

    const { cartState } = useContext(CartContext);
    const total = cartState.reduce(
    (acc, item) => acc + item.price * item.qtyItem,0);

  const handleCreateOrder = () => {
    const orderObj = {
      buyer: {
        name: name,
        lastName: lastName,
        email: email,
      },
      items: cartState.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.qtyItem,
        };
      }),
      total: total,
    };

    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, orderObj)
      .then(({ id }) => {
        toast({
          title: 'Pedido creado con éxito!',
          description: `Su número de orden es: ${id}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Error al crear el pedido.',
          description: `Hubo un problema: ${error.message}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handlePayment = async () => {
    const items = cartState.map((item) => ({
      title: item.title,
      quantity: item.qtyItem,
      currency_id: "ARS",
      unit_price: item.price,
    }));

    const payer = {
      email: user.email || "usuario@correo.com",
      name: user.displayName || "Usuario",
    };

    try {
      const response = await axios.post("http://localhost:3001/create_preference", {
        items,
        payer,
      });

      const preferenceId = response.data.id;
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
    }
  };

  return (
    <Box className ="container-payment" marginTop={16}>
      <Box className="header-payment">
        <Text  className="title">Realizar Pedido</Text>
        <Icon 
          as={CloseIcon} 
          onClick={onBack} 
          color={'white'}
          _hover={{ 
            cursor: "pointer", 
            color: "red.500"
          }}
        />
      </Box>
      <Box className="order-container">
      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <VStack spacing={2} align='normal'w={"100%"}>
          {cartState.map((item) => (  
            <Flex
              key={item.id}
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
                <Text fontSize="lg" fontWeight="bold" color={'white'}>
                  {item.title}
                </Text>
                <HStack spacing={4} mt={2}>
                  <Text color={'white'}>Precio: ${item.price.toFixed(2)}</Text>
                </HStack>
              </Box>
              <Spacer />
            </Flex>
          ))}
          <Flex m={'20px 0'} justifyContent="space-between" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" color={'white'}>
              Total:
            </Text>
            <Text fontSize="xl" fontWeight="bold" color={"rgba(237, 237, 78, 0.737)"}>
              ${total.toFixed(2)}
            </Text>
          </Flex>
        </VStack>
      )}
      </Box>
        <Box className="btn-container-payment">    
            <Button className="btn" colorScheme="teal" size="lg" onClick={handleCreateOrder}>
                Crear Orden
            </Button>
            <Button  size="md" onClick={onBack}>
                Ver más productos
            </Button>
            <Button className="btn" colorScheme="blue" size="lg" onClick={handlePayment}>
                Pagar con Mercado Pago
            </Button>
        </Box>
    </Box>
  );
};

  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");

 {/* <div className="form-container">
        <input
            type="text"
            placeholder="Nombre" 
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Apellido"
            onChange={(e) => setLastName(e.target.value)}
        />
        <input
            type="email"
            placeholder="Correo electronico"
            onChange={(e) => setEmail(e.target.value)}
        />
      </div> */}
