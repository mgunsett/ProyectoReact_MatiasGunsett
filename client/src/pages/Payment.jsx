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
    const [preferenceId, setPreferenceId] = useState(null)
    const { cartState } = useContext(CartContext);
    const total = cartState.reduce(
    (acc, item) => acc + item.price * item.qtyItem,0);
    
    const MP_PUBLIC_KEY = "APP_USR-7f3e4b4c-354e-4e36-b063-e990a53192f3";
    console.log("Public Key Mercado Pago:", MP_PUBLIC_KEY);


  const handleCreateOrder = async () => {
    try {
      // Verificar stock antes de crear la orden
      for (const item of cartState) {
        const productRef = db.doc(`products/${item.id}`);
        const productDoc = await productRef.get();
        if (!productDoc.exists) {
          throw new Error(`El producto ${item.id} no existe`);
        }
        const productData = productDoc.data();
        const currentStock = productData.sizesStock?.sizes?.[item.selectedSize] || 0;
        
        if (currentStock < item.qtyItem) {
          throw new Error(`No hay suficiente stock para el producto ${item.id}`);
        }
      }

      const orderObj = {
        buyer: {
          name: user.displayName,
          email: user.email,
        },
        items: cartState.map((item) => {
          return {
            productId: item.id,
            title: item.title,
            selectedSize: item.selectedSize,
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: item.qtyItem,
          };
        }),
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const ordersCollection = collection(db, "orders");
      const orderDoc = await addDoc(ordersCollection, orderObj);

      // Crear preferencia de pago en MercadoPago
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
          success: `${window.location.origin}/payment/success/${orderDoc.id}`,
          failure: `${window.location.origin}/payment/failure/${orderDoc.id}`,
          pending: `${window.location.origin}/payment/pending/${orderDoc.id}`,
        },
        notification_url: `${window.location.origin}/api/webhook/mercadopago`,
        external_reference: orderDoc.id,
      };

      // Aquí deberías hacer la llamada a tu backend para crear la preferencia
      const response = await axios.post('/api/create-preference', { preference });
      const preferenceId = response.data.preferenceId;
      setPreferenceId(preferenceId);

      toast({
        title: 'Su pedido se realizó con éxito!',
        description: `Su número de orden es: ${orderDoc.id}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error al procesar el pedido',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.error('Error al crear la orden:', error);
    }
};
  
// Pago Mercadopago :
  useEffect(() => {  
    if (MP_PUBLIC_KEY) {  
      initMercadoPago(MP_PUBLIC_KEY, {  
        locale: 'es-AR',  
        client: {  
          sandbox: false  // Cambiamos a producción
        }  
      });  
    } else {  
    console.error("La clave pública de Mercado Pago no está definida.");  
    }  
  }, [MP_PUBLIC_KEY]); 

  const handlePayment = async () => {
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
      // Primero, creamos la orden en Firestore
      const orderObj = {
        buyer: {
          name: user.displayName,
          email: user.email,
        },
        items: cartState.map((item) => ({
          productId: item.id,
          title: item.title,
          selectedSize: item.selectedSize,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: item.qtyItem,
        })),
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const ordersCollection = collection(db, "orders");
      const orderDoc = await addDoc(ordersCollection, orderObj);

      // Luego, creamos la preferencia en MercadoPago
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
          success: `https://berealclothes.netlify.app/`,
          failure: `https://berealclothes.netlify.app/checkout`,
          pending: `https://berealclothes.netlify.app/checkout`,
        },
        notification_url: `${window.location.origin}/api/webhook/mercadopago`,
        external_reference: orderDoc.id,
      };

      try {
        // Intentamos crear la preferencia en el backend
        const response = await axios.post('https://proyectoreact-matiasgunsett.onrender.com/create_preference', {
          preference
        });

        const { id } = response.data;
        console.log("ID de preferencia:", id);
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
        // Si hay error creando la preferencia, eliminamos la orden
        await orderDoc.delete();
        throw error;
      }
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
  
  useEffect(() => {
    if (!preferenceId && cartState.length > 0) {
        handlePayment();
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
              handleCreateOrder();
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
