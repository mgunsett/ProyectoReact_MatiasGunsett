import { 
Card, 
CardBody,
CardFooter,
Image,
Stack,
Heading,
Text,
Flex,
Box
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import './ProductsList.css';


export const ProductsList = ({ title, products }) => {

    function primeraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

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
    ml={{ base: "15px", md: "90px" }}
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
        height={{ base: "365px", sm: "380px" , md: "480px", lg: "500px" }}
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
                boxSize={{ base: "160px", sm: "170px", md: "210px", lg: "260px" }}
                height={{ base: "220px", sm: "180px", md: "250px", lg: "310px" }}
                objectFit="cover"
                maxW={"21rem"}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.05)" }}
              />
            </Link>
            <Stack textAlign={"left"} mt={2} spacing={2}>
            <Link to={`/item/${product.id}`}>
              <Heading 
                fontSize={{ base: "22px", sm: "25px", md: "25px", lg: "33px" }} 
                fontFamily={'"Bebas Neue", system-ui'}
                fontWeight={400}
                color={'white'} 
                width={{ base: "160px", sm: "160px", md: "200px", lg: "250px" }}
                _hover={{ color: "rgba(235, 248, 55, 0.8)" }}
              >
                {product.title}
              </Heading>
            </Link>
              <Text 
              maxW={"16rem"} 
              color={'white'}
              fontSize={{ base: "13px", sm: "15px", lg: "20px" }}
              mt={'-10px'}
              >
                {product.description}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            >
            <Text
              color="white"
              fontSize={{ base: "27px", sm: "25px", md: "40px" }}
              fontFamily={'"Bebas Neue", system-ui'}
              fontWeight={400}
            >
              ${product.price}
            </Text>
            {product.prevprice ? (
            <Text
              color={'red'}
              fontSize={{ base: "23px", sm: "20px", lg: "35px" }}
              fontFamily={'"Bebas Neue", system-ui'}
              fontWeight={400}
              textDecoration="line-through"
              ml={4}
            >
              ${product.prevprice}
            </Text>
            ) : ( null) }
            </Flex>
          </CardFooter>
        </Card>
      ))}
    </Flex>
        </Box>
    )
}