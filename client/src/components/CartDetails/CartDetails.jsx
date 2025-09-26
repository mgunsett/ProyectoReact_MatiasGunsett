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
  HStack,
  Spacer,
  Alert,
  AlertIcon,
  IconButton,   
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import Swal from 'sweetalert2';

export const CartDetails = ({onContinue}) => {

  const { cartState, addItem, removeItem, deleteItem } = useContext(CartContext);

  const total = cartState.reduce((acc, item) => acc + item.price * item.qtyItem, 0 );
  
  const handleDeleteItem = (item) => { deleteItem(item); };

  return (
    <Flex direction="column" h={{ base: "100dvh", md: "80vh" }}>
    <Box 
      p={{ base: 0, md: 4 }} 
      maxW={{ base: "100%", md: "600px" }} 
      mb={5}
      flex="1"
      minH={0}
      overflowY="auto"
    >
      <Heading 
      as="h2" 
      size="lg" 
      color={'black'}
      lineHeight={1.2}
      fontWeight={400}
      fontSize={{base: "50px", sm: "60px", lg: "70px"}}
      fontFamily={'"Bebas Neue", system-ui'}
      > 
        TU CARRITO
      </Heading>

      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <Box 
        w={{ base: "100%", md: "90%" }}
        >
          {cartState.map((item) => (  
            <Flex
              key={item.id + item.selectedSize}
              p={1}
              alignItems="center"
              mb={2}
              bg={'rgba(36, 34, 34, 0.8)'}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                boxSize={{ base: "85px", md: "90px"}}
                objectFit="cover"
                mr={4}
                h={{ base: "85px", md: "90px", lg: "110px" }}
              />
              <Box w={{ base: "140px" , md: "200px" }}>
                <Text 
                  fontSize={{ base: "18px", md: "20px",lg: "22px" }} 
                  fontFamily={'"Bebas Neue", system-ui'}
                  fontWeight={400}
                  color={'white'}
                >
                  {item.title}
                </Text>
                <Text 
                  fontSize={{ base: "xs", md: "sm",lg: "12px" }}
                  color={'rgba(237, 237, 78, 0.737)'}
                  fontWeight="semibold"
                >
                  Talle: {item.selectedSize}
                </Text>
                <Text 
                  color={'white'}
                  fontWeight="semibold"
                >
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
                    icon={<MinusIcon fontSize="16px" />}
                    size={{ base: "xs", md: "sm"}}
                    onClick={() => removeItem(item)}
                    isDisabled={item.qtyItem === 1}
                  />
                  <Text color={'white'}>{item.qtyItem}</Text>
                  <IconButton
                    aria-label="Aumentar cantidad"
                    icon={<AddIcon fontSize="16px" />}
                    size={{ base: "xs", md: "sm"}}
                    onClick={() => {
                      const key = item?.selectedSize?.toUpperCase?.();
                      const sizeStock = (key && item?.[key] != null) ? Number(item[key]) : (item?.stock != null ? Number(item.stock) : Infinity);
                      if (Number(item.qtyItem) >= sizeStock) {
                        Swal.fire({
                          icon: 'warning',
                          title: 'ATENCION!',
                          text: `No hay suficiente stock para el talle: ${item.selectedSize}. \n Stock disponible: ${sizeStock}`,
                        });
                        return;
                      }
                      addItem(item);
                    }}
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
      p={{ base: 2, md: 2 }}
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
        color={"rgba(0, 0, 0, 0.74)"}
      >
        Total: <Text color={"rgba(0, 0, 0, 0.74)"}>${total.toFixed(2)}</Text>
      </Text>
      <Spacer />
      <Button
        maxW={{ base: "80%", md: "100%" }}
        color={'white'}
        bg={'black'}
        mt={2}
        size={{ base: "xs", md: "lg" }}
        py={"7"}
        textTransform={"uppercase"}
        onClick={onContinue}
        _hover={{
          bg: 'rgba(255, 248, 144, 0.85)',
          color: 'black',
          transform: "translateY(2px)",
        }}
        fontSize={'15px'}
      >
      Continuar Compra
      </Button>  
    </Flex>
  </Flex>
  );
};
