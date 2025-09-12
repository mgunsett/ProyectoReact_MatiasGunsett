import { useState, useContext} from "react";
import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";
import './HomeDetailContainer.css';

export const HomeDetailContainer = ({ product }) => {

  const [selectedSize, setSelectedSize] = useState(null); 

  const [showCount, setShowCount] = useState(false);
  const [count, setCount] = useState(1);

  const { addItem, removeItem } = useContext(CartContext);

  const [mainImage, setMainImage] = useState(product.imageUrl); // Estado para la imagen principal

  // Mostrar el contador de cantidad //
  const handleAgregarAlCarrito = () => {
    if (!selectedSize) {
      alert("Por favor, selecciona un talle antes de agregar el producto al carrito.");
      return;
    }
    addItem({ ...product, selectedSize }, 1);
    setShowCount(!showCount);
  }; 
  
  // Si la cantidad es menor al stock, incrementar la cantidad en 1 //
  const handleIncrement = () => {
    if (count < product.stock && count < 10 && count > 0) { 
      const newCount = count + 1;
      setCount(newCount);
      addItem(product, newCount);
    }
  };
  // Si la cantidad es mayor a 0, decrementar la cantidad en 1 //
  const handleDecrement = () => {
    if (count > 0 && count <= 10 && count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      removeItem(product);
    }
  };
  // Función para manejar el click en los talles //
  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null); // Si el talle ya está seleccionado, deseleccionarlo
    }else {
      setSelectedSize(size); // Actualizar el talle seleccionado
    }
  };
  
  // Si product.sizesStock existe, extraemos los talles; sino, usamos un fallback
  const sizes = product.sizesStock ? Object.keys(product.sizesStock) : ["SM", "MD", "LA", "XL"];


  // Función para manejar el click en las imágenes //
  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc); 
  };

  return (
    <Box 
      className="HomeDetailContiner"
      width={{ base: "100%", sm: "80%", md: "80%"}}
      margin={"auto"}
      p={4}
    >
      <SimpleGrid
        className="detail-card"
        columns={{ base:1, sm: 1, md: 2 }}
        spacing={1} 
        p={1} 
      > 
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gap={6}
        >
          <Flex 
            flexDirection={'column'} 
            justifyContent={'space-between'} 
            alignItems={'center'}
            gap={4}
          >
            <Image 
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            boxSize={{ base: '60px', sm: '80px', md: '120px', lg: '150px' }}
            onClick={() => handleImageClick(product.imageUrl)}
            _hover={{ cursor: "pointer" }}
            />
            <Image
            alt={product.title}
            src={product.imageTwo}
            fit={'cover'}
            boxSize={{base: '60px', sm: '80px', md: '120px', lg: '150px'}}
            onClick={() => handleImageClick(product.imageTwo)}
            _hover={{ cursor: "pointer" }}
            />
            <Image
            alt={product.title}
            src={product.imageThree}
            fit={'cover'}
            boxSize={{base: '60px', sm: '80px', md: '120px', lg: '150px'}}
            onClick={() => handleImageClick(product.imageThree)} 
            _hover={{ cursor: "pointer" }}
            />
            <Image
            alt={product.title}
            src={product.imageFour}
            fit={'cover'}
            boxSize={{base: '60px', sm: '80px', md: '120px', lg: '150px'}}
            onClick={() => handleImageClick(product.imageFour)} 
            _hover={{ cursor: "pointer" }}
            />
          </Flex>
          <Image
            id="detail-image"
            alignSelf={'start'}
            alt={product.title}
            src={mainImage} // Usa el estado mainImage
            fit={'cover'}
            w={"70%"}
            h={{ base: "320px", sm: "400px", lg: "650px" }}
          />    
        </Flex>
        <Stack 
          alignSelf={'start'}
          p={2} >
          <Box as={"header"} marginBottom={6}>
            <Heading
                color={'black'}
                fontFamily={'"Bebas Neue", system-ui'}
                lineHeight={1.1}
                fontWeight={200}
                fontSize={{ base: "20px", sm: "30px", lg: "60px" }}
            >
              {product.title}
            </Heading>
            <Text
              color={'black'}
              fontWeight={300}
              fontSize={"2xl"}
              marginBottom={2}
            >
              {product.description}
            </Text>
            <Text
              color={'black'}
              fontSize={{ base: "20px", sm: "30px", lg: "40px" }}
              alignSelf={'flex-start'}
              fontFamily={'"Bebas Neue", system-ui'}
              fontWeight={600}
            >
              ${product.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={["column", "row"]}
            alignItems={"flex-start"}
          >
            <VStack spacing={{ base: 2, sm: 6 }}>
              <Text 
                color={'black'}
                fontSize={"2xl"}
                fontWeight={"300"}
                alignSelf={'flex-start'}
              >
                Talle :
              </Text>
              <Flex  gap={{ base: 1, sm: 4 }}>
              {sizes.map((size) => (
                <Button
                  key={size}    
                  size={{ base: "sm", sm: "md" }}
                  onClick={() => handleSizeClick(size)}
                  border="3px solid"
                  borderColor={selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "gray.300"}
                  color={selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "black"}
                  _hover={{
                    borderColor: "rgba(237, 237, 78, 0.737)",
                  }}
                  variant="outline"
                  disabled={product.sizesStock && product.sizesStock[size] <= 0} // Si el stock es 0, deshabilita el botón
                >
                  {size}
                </Button>
              ))}
              </Flex>
            </VStack>
          </Stack>

          <Button
            maxW={{ base: "100%", sm: "40%" }}
            size={"lg"}
            py={"7s"}
            fontFamily={'"Bebas Neue", system-ui'}
            fontWeight={200}
            backgroundColor={"rgba(0, 0, 0, 0.745)"}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              bg: "rgba(237, 237, 78, 0.737)",
              transform: "translateY(2px)",
              boxShadow: "lg",
              color: "black",
            }}
            onClick={ handleAgregarAlCarrito }
            fontSize={{ base: "12px", sm: "20px" }}
          >
            Agregar al carrito
          </Button>
          {showCount && (
            <Stack direction="row" spacing={4} align="center" mt={1}>
              <Button 
                boxSize={{ base: '28px', sm: '33px' }}
                onClick={handleDecrement}
                bg={'transparent'}
                color={'black'}
                border={'1px solid black'}
                _hover={{ bg: 'black', color: 'white' }} 
              >-</Button>
              <Text color={'black'} fontSize="lg">{count}</Text>
              <Button 
                onClick={handleIncrement}
                boxSize={{ base: '28px', sm: '33px' }}
                bg={'transparent'}
                color={'black'}
                border={'1px solid black'}
                _hover={{ bg: 'black', color: 'white' }} 
              >+</Button>
            </Stack>
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
};