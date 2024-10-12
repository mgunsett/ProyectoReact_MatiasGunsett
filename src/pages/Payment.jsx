import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Heading,
    Divider,
    VStack,
    HStack,
    Spacer,
    Alert,
    AlertIcon,
    useToast,
  } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { CartContext } from "../context";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import './Styles/Payment.css';

export const Payment = ({ onBack }) => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

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

  return (
    <Flex className ="container-payment" direction="column">
      <Heading as="h1" className="title">Realizar Pedido</Heading>
      <Box className="order-container">
      <Box>
      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <VStack spacing={4} align='normal'>
          {cartState.map((item) => (  
            <Flex
              key={item.id}
              p={4}
              alignItems="center"
              boxShadow="sm"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
                mr={4}
              />
              <Box maxW="sm" className="item-info-payment">
                <Text fontSize="xl" fontWeight="bold">
                  {item.title}
                </Text>
                <HStack spacing={4} mt={2}>
                  <Text>Precio: ${item.price.toFixed(2)}</Text>
                </HStack>
              </Box>
              <Spacer />
            </Flex>
          ))}
          <Flex alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Text>
          </Flex>
        </VStack>
      )}
      </Box>
      <Divider 
        className="divider"
        orientation="vertical" 
        />

      <div className="form-container">
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
      </div>
      </Box>
        <Box className="btn-container-payment">    
            <Button className="btn" colorScheme="teal" size="lg" onClick={handleCreateOrder}>
                Crear Orden
            </Button>
            <Button colorScheme="red" size="md" onClick={onBack}>
                Volver al Checkout
            </Button>
        </Box>
    </Flex>
  );
};