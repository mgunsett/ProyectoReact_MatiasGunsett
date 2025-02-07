import { useContext } from "react";
import { CartContext } from "../../context";
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
  IconButton,   
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";

export const CartDetails = ({onContinue}) => {

  const { cartState, addItem, removeItem, deleteItem } = useContext(CartContext);

  const total = cartState.reduce(
    (acc, item) => acc + item.price * item.qtyItem,
    0
  );
  
  const handleDeleteItem = (item) => {
    deleteItem(item);
  };

  return (
    <>
    <Box p={4} maxW="600px" mb={5}  h="70vh" overflowY="auto">
      <Heading 
      as="h2" 
      size="lg" 
      mb={6} 
      color={'white'}
      lineHeight={1.1}
      fontWeight={600}
      fontSize={{ base: "20px", sm: "30px", lg: "40px" }}
      fontFamily={'"Lacquer", system-ui'}
      > 
        TU CARRITO
      </Heading>

      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <VStack spacing={4}>
          {cartState.map((item) => (  
            <Flex
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
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
              <Box flex="1" w={'390px'} >
                <Text fontSize="xl" fontWeight="bold" color={'white'}>
                  {item.title}
                </Text>
                  <Text color={'white'}>Precio: ${item.price.toFixed(2)}</Text>
              </Box>
              <Spacer />
              <HStack>
              <HStack>
                    <IconButton
                      aria-label="Disminuir cantidad"
                      icon={<MinusIcon />}
                      size="sm"
                      onClick={() => removeItem(item)}
                      isDisabled={item.qtyItem === 1}
                    />
                    <Text color={'white'}>{item.qtyItem}</Text>
                    <IconButton
                      aria-label="Aumentar cantidad"
                      icon={<AddIcon />}
                      size="sm"
                      onClick={() => addItem(item)}
                      isDisabled={item.qtyItem >= item.stock}
                    />
                  </HStack>
                <IconButton
                  aria-label="Eliminar producto"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDeleteItem(item)}
                  _hover={{background: 'red.200'}}
                />
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}
  </Box>
  
  <Flex 
  p={6}
  w="70%"
  alignItems="center"
  justifyContent="space-between"
  borderTop="2px"
  borderColor="gray.200"
  borderTopColor="gray.200"
  >
    <Text fontSize="2xl" fontWeight="bold" color={'white'}>
      Total: <Text color={"rgba(237, 237, 78, 0.737)"}>${total.toFixed(2)}</Text>
    </Text>
    <Spacer />
    <Button
    maxW={"100%"}
    mt={2}
    size={"lg"}
    py={"7"}
    textTransform={"uppercase"}
    onClick={onContinue}
    _hover={{
      transform: "translateY(2px)",
      boxShadow: "lg",
    }}
    fontSize={'15px'}
    >
      Continuar Compra
    </Button>  
  </Flex>
  </>
  );
};