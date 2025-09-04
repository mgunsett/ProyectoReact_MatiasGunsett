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
        height={{ base: "330px", sm: "380px" , md: "430px", lg: "480px" }}
        flex="0 0 auto"
        backgroundColor={'rgba(0, 0, 0, 0.87)'}
        >
          <CardBody>
            <Link to={`/item/${product.id}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                borderRadius="md"
                boxSize={{ base: "140px", sm: "150px", md: "200px", lg: "250px" }}
                height={{ base: "170px", sm: "150px", md: "200px", lg: "250px" }}
                objectFit="cover"
                maxW={"21rem"}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
            <Stack textAlign={"left"} mt="6" spacing="2">
            <Link to={`/item/${product.id}`}>
              <Heading 
                size="sm" 
                color={'white'} 
                width={{ base: "130px", sm: "150px", md: "200px", lg: "250px" }}
                _hover={{ color: "rgba(235, 248, 55, 0.8)" }}
              >
                {product.title}
              </Heading>
            </Link>
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
        </Card>
      ))}
    </Flex>
        </Box>
    )
}