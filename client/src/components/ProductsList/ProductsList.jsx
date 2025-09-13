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
      backgroundColor={'rgba(255, 255, 255, 0.87)'}
      paddingTop={16}
      marginTop={-16}
    >
    <Box className='Banner'></Box>
    <Text 
    as={'h1'}
    color={'black'}
    lineHeight={1}
    fontWeight={400}
    fontSize= {{ base: "80px", sm: "90px", md: '100px' , lg: "110px" }}
    fontFamily={'"Bebas Neue", system-ui'}
    ml={{ base: "15px", md: "120px" }}
    >
    {primeraMayuscula(title)}
    </Text>
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
        minW={{ base: "160px", sm: "170px" , md: "210px", lg: "260px" }}
        height={{ base: "370px", sm: "380px" , md: "430px", lg: "480px" }}
        flex="0 0 auto"
        backgroundColor={'rgba(0, 0, 0, 0.87)'}
        >
          <CardBody
          p={{ base: "10px", sm: "1rem" , md: "1rem", lg: "1rem" }}
          >
            <Link to={`/item/${product.id}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                borderRadius="md"
                boxSize={{ base: "160px", sm: "150px", md: "200px", lg: "250px" }}
                height={{ base: "220px", sm: "150px", md: "200px", lg: "250px" }}
                objectFit="cover"
                maxW={"21rem"}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.05)" }}
              />
            </Link>
            <Stack textAlign={"left"} mt={2} spacing={0}>
            <Link to={`/item/${product.id}`}>
              <Heading 
                fontSize={{ base: "25px", sm: "25px", md: "25px", lg: "30px" }} 
                fontFamily={'"Bebas Neue", system-ui'}
                fontWeight={400}
                color={'white'} 
                width={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
                _hover={{ color: "rgba(235, 248, 55, 0.8)" }}
              >
                {product.title}
              </Heading>
            </Link>
              <Text maxW={"16rem"} color={'white'}>{product.description}</Text>
              <Text
                color="white"
                fontSize={{ base: "25px", sm: "25px", md: "40px" }}
                fontFamily={'"Bebas Neue", system-ui'}
                fontWeight={400}
              >
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Flex>
        </Box>
    )
}