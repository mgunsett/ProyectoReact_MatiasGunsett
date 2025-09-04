import { useState, useContext } from "react";
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
import { Link } from "react-router-dom";  
import { CartContext } from "../../context/CartContext";
import './ItemDetailContainer.css'

export const ItemDetailContainer = ({ product }) => {

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

    // Verificar si hay stock disponible para el tamaño seleccionado
    const sizeStock = product[selectedSize.toUpperCase()];
    if (!sizeStock || sizeStock <= 0) {
      alert(`No hay stock disponible para el talle ${selectedSize}`);
      return;
    }

    // Añadir al carrito con la cantidad correcta
    addItem({ ...product, selectedSize }, count);
    setShowCount(!showCount);
  };

  // Incrementar la cantidad si hay stock disponible
  const handleIncrement = () => {
    if (selectedSize) {
      const sizeStock = product[selectedSize.toUpperCase()];
      if (count < sizeStock) {
        const newCount = count + 1;
        setCount(newCount);
        addItem({ ...product, selectedSize }, newCount);
      } else {
        alert(`No hay suficiente stock para el talle ${selectedSize}. Stock disponible: ${sizeStock}`);
      }
    }
  };

  // Decrementar la cantidad
  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      removeItem({ ...product, selectedSize });
    }
  };

  // Función para manejar el click en los talles
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    // Resetear la cantidad cuando cambia el talle
    setCount(1);
  };

  // Extraer los talles disponibles del producto
  const sizes = Object.keys(product).filter(key => 
    ['SM', 'MD', 'LA', 'XL'].includes(key.toUpperCase())
  );

  // Función para manejar el click en las imágenes
  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc); 
  };

  return (
    <Box 
      className="detail-container"
      w={{ base: "100%", lg: "90%" }}
      m={"auto"}

    >
      <Box className="detail-guia">
        <Link className="guia-hover" to="/">Inicio</Link> /
        <Link className="guia-hover" to={`/category/${product.category}`}> {product.category} </Link> /
        <Link className="guia-hover" to={`/item/${product.id}`}> {product.title}</Link>
      </Box>
      <SimpleGrid
        alignSelf={'start'}
        justifyContent={'center'}
        alignItems={'center'}
        columns={{ sm: 1, md: 2 }}
        spacing={2} 
        p={1} 
      > 
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gap={{ base: 4, sm: 6 }}
        >
          <Flex 
            flexDirection={'column'} 
            justifyContent={'space-between'} 
            alignItems={'center'}
            gap={{ base: 3, sm: 4 }}
          >
            <Image 
            rounded={"sm"}
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            boxSize={{ base: '70px', sm: '90px', md: '120px', lg: '150px' }}
            onClick={() => handleImageClick(product.imageUrl)}
            _hover={{ cursor: "pointer" }}
            />
            <Image
            rounded={"sm"}
            alt={product.title}
            src={product.imageTwo}
            fit={'cover'}
            boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
            onClick={() => handleImageClick(product.imageTwo)}
            _hover={{ cursor: "pointer" }}
            />
            <Image
            rounded={"sm"}
            alt={product.title}
            src={product.imageThree}
            fit={'cover'}
            boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
            onClick={() => handleImageClick(product.imageThree)} 
            _hover={{ cursor: "pointer" }}
            />
            <Image
            rounded={"sm"}
            alt={product.title}
            src={product.imageFour}
            fit={'cover'}
            boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
            onClick={() => handleImageClick(product.imageFour)} 
            _hover={{ cursor: "pointer" }}
            />
          </Flex>
          <Image
            id="detail-image"
            alignSelf={'start'}
            rounded={"sm"}
            alt={product.title}
            src={mainImage} // Usar el estado mainImage
            fit={'cover'}
            w={"76%"}
            h={{ base: "320px", sm: "400px", lg: "650px" }}
          />    
        </Flex>
        <Stack alignSelf={'start'} p={{ base: 1, sm: 2 }}>  
          <Box as={"header"} marginBottom={{ base: 9, sm: 14 }}>
            <Heading
              color={'black'}
              lineHeight={1}
              fontWeight={600}
              fontSize= {{ base: "35px", sm: "30px", lg: "40px" }}
              fontFamily={'"Bebas Neue", system-ui'}
            >
              {product.title}
            </Heading>
            <Text
              color={'white'}
              fontWeight={300}
              fontSize={{ base: "25px", sm: "30px", lg: "40px" }}
              marginBottom={2}
            >
              {product.description}
            </Text>
            <Text
              color={'black'}
              fontSize={{ base: "35px", sm: "45px", lg: "55px" }}
              alignSelf={'flex-start'}
              fontFamily={'fantasy'}
            >
              ${product.price}
            </Text>
          </Box>

          <Stack
            spacing={2}
            direction={["column", "row"]}
            alignItems={"flex-start"}
          >
            <VStack spacing={2}>
              <Text 
                color={'white'}
                fontSize={"20px"}
                fontWeight={"300"}
                fontFamily={'"Bebas Neue", system-ui'}
                alignSelf={'flex-start'}
              >
                Talle :
              </Text>
              <Flex  gap={{ base: 1 , sm: 4 }}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  size={{ base: "sm", sm: "md" }}
                  onClick={() => handleSizeClick(size)}
                  border="2px solid"
                  borderColor={selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "gray.300"}
                  color={selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "white"}
                  _hover={{
                    borderColor: "rgba(237, 237, 78, 0.737)",
                  }}
                  variant="outline"
                  disabled={product[size] <= 0} // Si el stock es 0, deshabilita el botón
                >
                  {size}
                </Button>
              ))}
              </Flex>
            </VStack>
          </Stack>

          <Button
            maxW={{ base: "100%", sm: "100%" }}
            size={"lg"}
            py={"7"}
            backgroundColor={"rgba(0, 0, 0, 0.745)"}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              border: "1px solid rgba(237, 237, 78, 0.737)",
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={handleAgregarAlCarrito}
            fontSize={{ base: "12px", sm: "15px" }}
          >
            Agregar al carrito
          </Button>
          {showCount && (
            <Stack direction="row" spacing={4} align="center" mt={1}>
              <Button 
                boxSize={'33px'}
                onClick={handleDecrement}
                bg={'transparent'}
                color={'white'}
                border={'1px solid white'}
                _hover={{ bg: 'white', color: 'black' }} 
              >-</Button>
              <Text color={'white'} fontSize="lg">{count}</Text>
              <Button 
                onClick={handleIncrement}
                boxSize={'33px'}
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