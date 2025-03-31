import { useContext } from "react";
import { CartContext } from "../../context";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Heading,
  Stack,
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

  const total = cartState.reduce((acc, item) => acc + item.price * item.qtyItem, 0 );
  
  const handleDeleteItem = (item) => { deleteItem(item);};

  return (
    <>
    <Box 
      p={{ base: 0, md: 4 }} 
      maxW={{ base: "100%", md: "600px" }} 
      mb={5}  
      h="70vh" 
      overflowY="auto"
    >
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
        <Box w={{ base: "330px", md: "90%" }}>
          {cartState.map((item) => (  
            <Flex
              key={item.id + item.selectedSize}
              p={1}
              borderWidth="1px"
              borderRadius="md"
              alignItems="center"
              boxShadow="sm"
              mb={2}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                boxSize="90px"
                objectFit="cover"
                borderRadius="md"
                mr={4}
                h={'110px'}
              />
              <Box 
                
                w={{ base: "140px"}}
              >
                <Text 
                  fontSize={{ base: "sm", md: "md",lg: "xl" }} 
                  fontWeight="bold" 
                  color={'white'}
                >
                  {item.title}
                </Text>
                  <Text color={'white'}>
                    Precio:
                  </Text>
                  <Text color={'white'}>
                    ${item.price}
                  </Text>
              </Box>
              <Spacer />
              <HStack>
                <Stack 
                  direction={{ base: "column", md: "row" }}
                  spacing={2}
                  alignItems="center"
                >
                  <IconButton
                    aria-label="Disminuir cantidad"
                    icon={<MinusIcon />}
                    size={{ base: "xs", md: "sm" }}
                    onClick={() => removeItem(item)}
                    isDisabled={item.qtyItem === 1}
                  />
                  <Text color={'white'}>{item.qtyItem}</Text>
                  <IconButton
                    aria-label="Aumentar cantidad"
                    icon={<AddIcon />}
                    size={{ base: "xs", md: "sm" }}
                    onClick={() => addItem(item)}
                    isDisabled={item.qtyItem >= item.stock}
                  />
                </Stack>
                <IconButton
                  aria-label="Eliminar producto"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDeleteItem(item)}
                  _hover={{background: 'red.200'}}
                  mr={2}
                />
              </HStack>
            </Flex>
          ))}
        </Box>
      )}
  </Box>
  
  <Flex 
  p={{ base: 4, md: 6 }}
  w={{ base: "100%", md: "70%" }}
  alignItems="center"
  justifyContent="space-between"
  borderTop="2px"
  borderColor="gray.200"
  borderTopColor="gray.200"
  >
    <Text 
      fontSize={{ base: "lg", md: '2xl' }}
      fontWeight="bold" 
      color={'white'}
    >
      Total: <Text color={"rgba(237, 237, 78, 0.737)"}>${total.toFixed(2)}</Text>
    </Text>
    <Spacer />
    <Button
    maxW={{ base: "80%", md: "100%" }}
    mt={2}
    size={{ base: "xs", md: "lg" }}
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