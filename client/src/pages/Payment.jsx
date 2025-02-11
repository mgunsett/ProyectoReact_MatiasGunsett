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
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useAuth } from "../context/AuthContext";
import './Styles/Payment.css';
import axios from "axios";

 
export const Payment = ({ onBack }) => {

  const { user } = useAuth();

  // Al montar el componente, bloqueamos el scroll del body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
    // Al desmontar el componente, restauramos el scroll
      document.body.style.overflow = "unset";
    };
  }, []);

    const toast = useToast();
    const [preferenceId, setPreferenceId] = useState(null);
    
    const { cartState } = useContext(CartContext);
    const total = cartState.reduce(
    (acc, item) => acc + item.price * item.qtyItem,0);
    
    const MP_PUBLIC_KEY = "APP_USR-7f3e4b4c-354e-4e36-b063-e990a53192f3";
    console.log("Public Key Mercado Pago:", MP_PUBLIC_KEY);


  const handleCreateOrder = () => {
    const orderObj = {
      buyer: {
          name: user.displayName,
          email: user.email,
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
          position: 'top',
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
  
// Pago Mercadopago :
  useEffect(() => {  
    if (MP_PUBLIC_KEY) {  
      initMercadoPago(MP_PUBLIC_KEY, {  
        locale: 'es-AR',  
        client: {  
          sandbox: true  
        }  
      });  
    } else {  
    console.error("La clave pública de Mercado Pago no está definida.");  
    }  
  }, [MP_PUBLIC_KEY]); 

  const handlePayment = async () => {
    const items = cartState.map((item) => ({
      title: item.title,
      quantity: item.qtyItem,
      currency_id: "ARS",
      unit_price: item.price,
    }));
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
    const payer = {
      email: user.email,
      name: user.displayName,
    };
    try {
      const URL_BACK = "https://proyectoreact-matiasgunsett.onrender.com";
      const response = await axios.post( URL_BACK, {
        items,
        payer,
      });

      const {id} = response.data;
      console.log("ID de preferencia:", id);
      setPreferenceId(id);

    } catch (error) {
      console.error("Error al iniciar el pago:", error);
    }
  };
  
  useEffect(() => {
    if (!preferenceId && cartState.length > 0) {
        handlePayment();
    }
  }, [preferenceId, cartState]);

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
            {preferenceId && (
            <Wallet 
              initialization={{ preferenceId: preferenceId , redirectMode: 'blank'}} 
              customization={{ 
                texts:{ valueProp: 'smart_option'},
              }} 
            />
             )}
            <Button  size="md" onClick={onBack}>
                Ver más productos
            </Button>
        </Box>
    </Box>
  );
};


//! Recolección Datos de Usuario en FORMULARIO 👇
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
