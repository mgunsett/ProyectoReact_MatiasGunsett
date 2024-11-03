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
    <Box p={6 } maxW="800px" mx="auto" mb={6}  h="70vh" overflowY="auto">
      <Heading as="h2" size="lg" mb={6}> 
        TU CARRITO
      </Heading>

      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
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
              <Box flex="1">
                <Text fontSize="xl" fontWeight="bold">
                  {item.title}
                </Text>
                <HStack spacing={4} mt={2}>
                  <Text>Precio: ${item.price.toFixed(2)}</Text>
                  <HStack>
                    <IconButton
                      aria-label="Disminuir cantidad"
                      icon={<MinusIcon />}
                      size="sm"
                      onClick={() => removeItem(item)}
                      isDisabled={item.qtyItem === 1}
                    />
                    <Text>{item.qtyItem}</Text>
                    <IconButton
                      aria-label="Aumentar cantidad"
                      icon={<AddIcon />}
                      size="sm"
                      onClick={() => addItem(item)}
                      isDisabled={item.qtyItem >= item.stock}
                    />
                  </HStack>
                </HStack>
              </Box>
              <Spacer />
              <HStack>
                <Text fontWeight="bold">
                  Subtotal: ${(item.price * item.qtyItem).toFixed(2)}
                </Text>
                <IconButton
                  aria-label="Eliminar producto"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDeleteItem(item)}
                />
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}
  </Box>
  <Divider />
  <Flex 
  p={6}
  w="50%"
  alignItems="center"
  justifyContent="space-between"
  borderTop="1px"
  borderColor="gray.200"
  borderTopColor="gray.200"
  margin={"0 auto"}
  >
    <Text fontSize="2xl" fontWeight="bold">
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
    ontSize={'15px'}
    >
      Continuar Compra
    </Button>  
  </Flex>
  </>
  );
};