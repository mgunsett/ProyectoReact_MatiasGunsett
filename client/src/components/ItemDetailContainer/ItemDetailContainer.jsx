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
import { Link, useLocation } from "react-router-dom";  
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
    ['SM', 'MD', 'LA', 'XL', '2XL'].includes(key.toUpperCase())
  );

  // Función para manejar el click en las imágenes
  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc); 
  };

  // Detectar categoría desde la navegación (si se pasó por state) o usar la primera
  const location = useLocation();
  const fromCategory = location.state?.fromCategory;
  const activeCategory = fromCategory ?? (product.categories?.[0] ?? '');

  return (
    <Box 
      className="detail-container"
      width={{ base: "90%", sm: "80%", md: "80%"}}
      margin={"auto"}
      marginBottom={"90px"}
      p={"5px"}
    >
      
      <SimpleGrid
        alignSelf={'start'}
        justifyContent={'center'}
        alignItems={'center'}
        columns={{ base: 1, sm: 1, md: 2 }}
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
            {product.imageTwo ? (
              <Image
                rounded={"sm"}
                alt={product.title}
                src={product.imageTwo}
                fit={'cover'}
                boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
                onClick={() => handleImageClick(product.imageTwo)}
                _hover={{ cursor: "pointer" }}
              />
            ) : (
              <Box
                rounded={"sm"}
                boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
              />
            )}
            {product.imageThree ? (
              <Image
                rounded={"sm"}
                alt={product.title}
                src={product.imageThree}
                fit={'cover'}
                boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
                onClick={() => handleImageClick(product.imageThree)} 
                _hover={{ cursor: "pointer" }}
              />
            ) : (
              <Box
                rounded={"sm"}
                boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
              />
            )}
            {product.imageFour ? (
              <Image
                rounded={"sm"}
                alt={product.title}
                src={product.imageFour}
                fit={'cover'}
                boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
                onClick={() => handleImageClick(product.imageFour)} 
                _hover={{ cursor: "pointer" }}
              />
            ) : (
              <Box
                rounded={"sm"}
                boxSize={{base: '70px', sm: '90px', md: '120px', lg: '150px'}}
              />
            )}
          </Flex>
          <Image
            id="detail-image"
            alignSelf={'start'}
            rounded={"sm"}
            alt={product.title}
            src={mainImage} // Usar el estado mainImage
            fit={'cover'}
            w={"75%"}
            h={{ base: "320px", sm: "400px", lg: "690px" }}
          />    
        </Flex>
        
        <Stack alignSelf={'start'} p={{ base: 1, sm: 2 }}>  
          <Box as={"header"} marginBottom={{ base: 9, sm: 14 }}>
            <Flex
              gap={2}
              alignItems={'center'}
              fontSize={{ base: "12px", sm: "15px" }}
              color={'black'}
            >
              <Link className="guia-hover" to="/">Inicio</Link> /
              <Link className="guia-hover" to={`/category/${activeCategory}`} state={{ fromCategory: activeCategory }}> {activeCategory} </Link> /
              <Link className="guia-hover" to={`/item/${product.id}`}> {product.title}</Link>
            </Flex>
            <Heading
              color={'black'}
              fontFamily={'"Bebas Neue", system-ui'}
              lineHeight={1.1}
              fontWeight={200}
              fontSize={{ base: "40px", sm: "30px", lg: "60px" }}
            >
              {product.title}
            </Heading>
            <Text
              color={'black'}
              fontWeight={300}
              fontSize={{ base: "15px", sm: "20px", lg: "25px" }}
              marginBottom={2}
            >
              {product.description}
            </Text>
            {product.prevprice ? (
            <Text
              color={'red'}
              fontSize={{ base: "25px", sm: "25px", lg: "45px" }}
              alignSelf={'flex-start'}
              fontFamily={'"Bebas Neue", system-ui'}
              fontWeight={400}
              textDecoration="line-through"
            >
              ${product.prevprice}
            </Text>
            ) : ( null) }
            <Text
              color={'black'}
              fontSize={{ base: "30px", sm: "30px", lg: "50px" }}
              alignSelf={'flex-start'}
              fontFamily={'"Bebas Neue", system-ui'}
              fontWeight={600}
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
                color={'black'}
                fontSize={{ base: "15px", sm: "20px", lg: "25px" }}
                fontWeight={"300"}
                alignSelf={'flex-start'}
              >
                Talle :
              </Text>
              <Flex gap={{ base: 1 , sm: 4 }}>
              {sizes.map((size) => {
                const isOutOfStock = product[size] <= 0;
                return (
                  <Button
                    key={size}
                    size={{ base: "sm", sm: "md" }}
                    onClick={() => !isOutOfStock && handleSizeClick(size)}
                    border="2px solid"
                    borderColor={isOutOfStock ? "gray.400" : selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "gray.300"}
                    color={isOutOfStock ? "gray.500" : selectedSize === size ? "rgba(237, 237, 78, 0.737)" : "black"}
                    backgroundColor={isOutOfStock ? "gray.100" : "transparent"}
                    opacity={isOutOfStock ? 0.6 : 1}
                    textDecoration={isOutOfStock ? "line-through" : "none"}
                    _hover={isOutOfStock? {} : { borderColor: "rgba(237, 237, 78, 0.737)",}}
                    cursor={isOutOfStock ? "not-allowed" : "pointer"}
                    variant="outline"
                    position="relative"
                  >
                    {size}
                  </Button>
                );
              })}
              </Flex>
            </VStack>
          </Stack>

          <Button
            maxW={{ base: "100%", sm: "40%" }}
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
            fontSize={{ base: "15px", sm: "20px" }}
          >
            Agregar al carrito
          </Button>
          {showCount && (
            <Stack direction="row" spacing={4} align="center" mt={1}>
              <Button 
                boxSize={'33px'}
                onClick={handleDecrement}
                bg={'transparent'}
                color={'black'}
                border={'1px solid black'}
                _hover={{ border: '1px solid rgba(237, 237, 78, 0.737)', color: 'black' }} 
              >-</Button>
              <Text color={'black'} fontSize="lg">{count}</Text>
              <Button 
                onClick={handleIncrement}
                boxSize={'33px'}
                bg={'transparent'}
                color={'black'}
                border={'1px solid black'}
                _hover={{ border: '1px solid rgba(237, 237, 78, 0.737)', color: 'black' }} 
              >+</Button>
            </Stack>
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
};