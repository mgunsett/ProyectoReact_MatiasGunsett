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
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Wallet } from '@mercadopago/sdk-react';
import { useAuth } from "../context/AuthContext";
import './Styles/Payment.css';
import axios from "axios";
import Swal from 'sweetalert2';
import { MdOutlineWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";

export const Payment = ({ onBack }) => {

const { user } = useAuth();
const [preferenceId, setPreferenceId] = useState(null)  
const { cartState } = useContext(CartContext);
const total = cartState.reduce(
(acc, item) => acc + item.price * item.qtyItem,0);
 const toast = useToast();

//! Al montar el componente, bloqueamos el scroll del body-------------
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
  // Al desmontar el componente, restauramos el scroll
    document.body.style.overflow = "unset";
  };
}, []);
//!--------------------------------------------------------------------

// Pre-warm del backend para evitar cold start de Render
useEffect(() => {
  // Hacemos un ping no bloqueante; si falla, no interrumpe el flujo
  fetch('https://proyectoreact-matiasgunsett.onrender.com/warm', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store',
  }).catch(() => {});
}, []);

// Crear orden rápidamente y luego la preferencia para renderizar la Wallet cuanto antes
const createPreferenceFast = async () => {
  if (!user) {
    Swal.fire({
      title: 'Usuario no autenticado.',
      description: 'Por favor, inicie sesión para continuar con el pago.',
      icon: 'error',
      confirmButtonColor: 'black',
    });
    return;
  }

  try {
    // Verificar si hay productos en el carrito
    if (cartState.length === 0) {
      throw new Error('El carrito está vacío');
    }

    // 1) Crear orden en Firestore (rápido, sin lecturas cliente)
    const orderObj = {
      buyer: {
        name: user.displayName,
        email: user.email,
      },
      items: cartState.map((item) => ({
        productId: item.id,
        title: item.title,
        selectedSize: item.selectedSize?.toUpperCase(),
        price: item.price,
        quantity: item.qtyItem,
      })),
      total: total,
      paymentStatus: 'pending',
      createdAt: new Date ().toISOString(), 
      orderNumber: `ORD -  ${Date .now()}`,
    };
    const ordersCollection = collection(db, 'orders');
    const orderDoc = await addDoc(ordersCollection, orderObj);

    // 2) Crear preferencia apuntando a esa orden (external_reference)
    const items = cartState.map((item) => ({
      title: item.title,
      quantity: item.qtyItem,
      currency_id: 'ARS',
      unit_price: item.price,
      metadata: {
        productId: item.id,
        selectedSize: item.selectedSize?.toUpperCase(),
      },
    }));

    const preference = {
      items,
      payer: {
        name: user.displayName,
        email: user.email,
      },
      back_urls: {
        success: `https://berealclothes.netlify.app/postpayment`,
        failure: `https://berealclothes.netlify.app/checkout`,
        pending: `https://berealclothes.netlify.app/checkout`,
      },
      external_reference: orderDoc.id,
      auto_return: 'approved',
    };

    const response = await axios.post(
      `https://proyectoreact-matiasgunsett.onrender.com/create_preference`,
      { preference }
    );

    const { id } = response.data;
    setPreferenceId(id);
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    toast({
      title: 'Error al iniciar el pago',
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
    // Crear preferencia lo antes posible (sin bloqueos de Firestore cliente)
    createPreferenceFast();
  }
}, [preferenceId, cartState]);

return (
  <Box className="container-payment" marginTop={16}>
    <Box className="header-payment">
      <Text 
      className="title"
      fontFamily={"'bebas neue', sans-serif"}
      >Realizar Pedido</Text>
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
            <Text fontSize="2xl" fontWeight="bold" color={"white"}>
              Total:
            </Text>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={"rgba(237, 237, 78, 0.737)"}
            >
              ${total.toFixed(2)}
            </Text>
          </Flex>
        </VStack>
      )}
    </Box> 
    <Box className="btn-container-payment"> 
      {preferenceId ? ( 
        <Wallet
          initialization={{ preferenceId: preferenceId}}
          onReady={() => console.log("Wallet está listo")}
          onSubmit={(data) => console.log("Pago enviado", data)}
          onApprove={(data) => {
            console.log("Pago aprobado", data);
          }}
          customization={{
            texts: { valueProp: "smart_option" },
          }}
        />
      ) : (
        <Button
          size="md"
          isLoading
          loadingText="Cargando"
          spinnerPlacement="end"
          colorScheme="blue"
          bg="#009EE3"
          color="white"
          _hover={{ bg: "#0077B6" }}
        >
          Cargando <span className="loading-dots">...</span>
        </Button>   
      )}
      <Link to='https://wa.link/oyoj7s' target='_blank'>
        <Button
          px={4}
          fontSize={{ base: 'sm', sm: 'md' }}
          color={'black'}
          background={'#25d365a7'}
          border={'1px solid black'}
          _hover={{ bg: '#25D366' }}
          gap={2}
        >   
          <MdOutlineWhatsapp size={'22px'}/>
          Transferencia - 10%OFF
        </Button>
      </Link>
      <Button size="md" onClick={onBack}>
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
