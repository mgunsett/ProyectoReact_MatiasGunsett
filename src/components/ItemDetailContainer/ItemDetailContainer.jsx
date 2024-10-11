import { useState, useContext } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";
import './ItemDetailContainer.css'

export const ItemDetailContainer = ({ product }) => {

  const [showCount, setShowCount] = useState(false);
  const [count, setCount] = useState(0);

  const { addItem, removeItem } = useContext(CartContext); // Traido desde CONTEXT ----

  const handleShowCount = () => {
    setShowCount(!showCount);
  };

  const handleIncrement = () => {
    if (count < product.stock) {
      const newCount = count + 1;
      setCount(newCount);
      addItem(product, newCount);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      removeItem(product);
    }
  };

  return (
    <Box className="detail-container">
      <Box className="detail-title">
      <Heading>Detalle de Producto</Heading>
      <Divider 
        borderColor={'black'}
        orientation="horizontal" 
        width={"50%"}
        marginLeft={'20px'}/>
      </Box>
      <SimpleGrid
        className="detail-card"
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 18 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={product.title}
            src={product.imageUrl}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack align={'left'} spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "3xl", lg: "4.5xl" }}
            >
              {product.title}
            </Heading>
            <Text
              color={'white'}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {product.description}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={'white'}
                fontSize={"2xl"}
                fontWeight={"300"}
                alignSelf={'flex-start'}
              >
                Cantidad disponible: {product.stock}
              </Text>
              <Text
                color='blue.800'
                fontSize={"2xl"}
                fontWeight={"300"}
                alignSelf={'flex-start'}
                fontFamily={'fantasy'}
                mb={5}
              >
                ${product.price}
              </Text>
            </VStack>
          </Stack>

          <Button
            rounded={"none"}
            maxW={"80%"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={handleShowCount}
            fontSize={'15px'}
          >
            Agregar al carrito
          </Button>
          {showCount && (
            <Stack direction="row" spacing={4} align="center" mt={1}>
              <Button onClick={handleDecrement}>-</Button>
              <Text fontSize="lg">{count}</Text>
              <Button onClick={handleIncrement}>+</Button>
            </Stack>
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
};