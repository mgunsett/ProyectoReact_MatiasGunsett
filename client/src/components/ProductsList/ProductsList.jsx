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
      direction="row"
      wrap="wrap"
      gap="5rem"
      padding="1rem"
      maxW="100%"
      justifyContent={"center"}
      paddingBottom={16}
    >
      {products.map((product) => (
        <Card 
        key={product.id} 
        maxW="md" 
        minW="250px" 
        flex="0 0 auto"
        backgroundColor={('rgba(0, 0, 0, 0.381)')}
        >
          <CardBody>
            <Link to={`/item/${product.id}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                borderRadius="md"
                boxSize="250px"
                objectFit="cover"
                maxW={"20rem"}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
            <Stack textAlign={"left"} mt="6" spacing="2">
              <Heading size="sm" color={'white'} >{product.title}</Heading>
              <Text maxW={"16rem"} color={'white'}>{product.description}</Text>
              <Text
                color="blue.500"
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
            <ButtonGroup spacing="3" color={'white'} _hover={{
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