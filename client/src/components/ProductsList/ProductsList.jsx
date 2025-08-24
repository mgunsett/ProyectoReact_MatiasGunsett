import { 
Card, 
CardBody,
CardFooter,
Image,
Stack,
Heading,
Text,
Divider,
ButtonGroup,
Flex,
Box
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import './ProductsList.css';


export const ProductsList = ({ title, products }) => {

    function primeraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    } //Mejorar funcion repetida en /ItemListContainer...

    return (
    <Box 
      className='CategoryPage' 
      backgroundColor={('gray.200', 'gray.700')}
      paddingTop={16}
      marginTop={-16}
    >
    <Box className='Banner'></Box>
    <Text className='TitleHeader'>{primeraMayuscula(title)}</Text>
    <Flex
      wrap="wrap"
      gap={2}
      justifyContent="center"
      maxW="100%"
      paddingBottom={16}
    >
      {products.map((product) => (
        <Card 
        key={product.id} 
        minW={{ base: "140px", sm: "160px" , md: "210px", lg: "260px" }} 
        height={{ base: "360px", sm: "380px" , md: "430px", lg: "480px" }}
        flex="0 0 auto"
        backgroundColor={('rgba(0, 0, 0, 0.381)')}
        >
          <CardBody>
            <Link to={`/item/${product.id}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                borderRadius="md"
                boxSize={{ base: "140px", sm: "150px", md: "200px", lg: "250px" }}
                objectFit="cover"
                maxW={"21rem"}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
            <Stack textAlign={"left"} mt="6" spacing="2">
              <Heading 
                size="sm" 
                color={'white'} 
                width={{ base: "130px", sm: "150px", md: "200px", lg: "250px" }}
              >
                {product.title}
              </Heading>
              <Text maxW={"16rem"} color={'white'}>{product.description}</Text>
              <Text
                color="white"
                fontSize="18px"
                fontFamily={"fantasy"}
                fontWeight={"100"}
              >
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider color={'white'}/>
          <CardFooter>
            <ButtonGroup 
            color={'white'} 
            _hover={{
                backgroundColor: "rgba(237, 237, 78, 0.737)",
                transform: "scale(1.1)",
                borderRadius: "2px",
                height: "25px",
                width: "110px",
                color: "black",
                paddingLeft: "10px",
              }}>
              <Link to={`/item/${product.id}`}>+ Ir a Detalle</Link>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Flex>
        </Box>
    )
}