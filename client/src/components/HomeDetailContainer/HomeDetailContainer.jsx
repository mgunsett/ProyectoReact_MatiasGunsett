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
  const [count, setCount] = useState(0);

  const { addItem, removeItem } = useContext(CartContext);

  const [mainImage, setMainImage] = useState(product.imageUrl); // Estado para la imagen principal

  // Mostrar el contador de cantidad //
  const handleShowCount = () => {
    setShowCount(!showCount);
  }; 
  // Si la cantidad es menor al stock, incrementar la cantidad en 1 //
  const handleIncrement = () => {
    if (count < product.stock) { 
      const newCount = count + 1;
      setCount(newCount);
      addItem(product, newCount);
    }
  };
  // Si la cantidad es mayor a 0, decrementar la cantidad en 1 //
  const handleDecrement = () => {
    if (count > 0) {
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
  const sizes = ["SM", "ME", "LA", "XL"]; // Talles disponibles

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
                color={"rgba(237, 237, 78, 0.737)"}
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "20px", sm: "30px", lg: "40px" }}
                fontFamily={'"Lacquer", system-ui'}
            >
              {product.title}
            </Heading>
            <Text
              color={'white'}
              fontWeight={300}
              fontSize={"2xl"}
              marginBottom={2}
            >
              {product.description}
            </Text>
            <Text
              color={"rgba(237, 237, 78, 0.737)"}
              fontSize={"2xl"}
              alignSelf={'flex-start'}
              fontFamily={'fantasy'}
            >
              ${product.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={["column", "row"]}
            alignItems={"flex-start"}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text 
                color={'white'}
                fontSize={"20px"}
                fontWeight={"300"}
                alignSelf={'flex-start'}
              >
                Talle :
              </Text>
              <Flex  gap={2}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  size={{ base: "sm", sm: "md" }}
                  onClick={() => handleSizeClick(size)}
                  border="3px solid"
                  borderColor={selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "gray.300"}
                  color={selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "white"}
                  _hover={{
                    borderColor: "rgba(237, 237, 78, 0.737)",
                  }}
                  variant="outline"
                >
                  {size}
                </Button>
              ))}
              </Flex>
            </VStack>
          </Stack>

          <Button
            maxW={{ base: "100%", sm: "60%" }}
            size={"lg"}
            py={"7s"}
            backgroundColor={"rgba(0, 0, 0, 0.745)"}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              bg: "rgba(237, 237, 78, 0.737)",
              transform: "translateY(2px)",
              boxShadow: "lg",
              color: "black",
            }}
            onClick={handleShowCount}
            fontSize={{ base: "12px", sm: "15px" }}
          >
            Agregar al carrito
          </Button>
          {showCount && (
            <Stack direction="row" spacing={4} align="center" mt={1}>
              <Button 
                boxSize={{ base: '28px', sm: '33px' }}
                onClick={handleDecrement}
                bg={'transparent'}
                color={'white'}
                border={'1px solid white'}
                _hover={{ bg: 'white', color: 'black' }} 
              >-</Button>
              <Text color={'white'} fontSize="lg">{count}</Text>
              <Button 
                onClick={handleIncrement}
                boxSize={{ base: '28px', sm: '33px' }}
                bg={'transparent'}
                color={'white'}
                border={'1px solid white'}
                _hover={{ bg: 'white', color: 'black' }} 
              >+</Button>
            </Stack>
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
};