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
      <Box className="detail-guia">
        <Link className="guia-hover" to="/">Inico</Link> /
        <Link className="guia-hover" to={`/category/${product.category}`}> {product.category} </Link> /
        <Link className="guia-hover" to={`/item/${product.id}`}> {product.title}</Link>
      </Box>
      <SimpleGrid
        className="detail-card"
        columns={{ sm: 1, md: 2 }}
        spacing={2} 
        p={2} 
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
            rounded={"md"}
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            w={'150px'}
            h={'150px'}/>
            <Image
            rounded={"md"}
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            w={'150px'}
            h={'150px'}/>
            <Image
            rounded={"md"}
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            w={'150px'}
            h={'150px'}/>
            <Image
            rounded={"md"}
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            w={'150px'}
            h={'150px'}/>
          </Flex>
          <Image
            rounded={"md"}
            alt={product.title}
            src={product.imageUrl}
            fit={'cover'}
            w={"70%"}
            h={{ base: "100%", sm: "400px", lg: "650px" }}
          />
        </Flex>
        <Stack 
          alignSelf={'start'}
          p={2} >
          <Box as={"header"}>
            <Heading
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
              marginBottom={12}
            >
              {product.description}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={["column", "row"]}
            alignItems={["center", "flex-start"]}
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