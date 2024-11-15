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
    <>
    <Box
    className='Banner'
    >
    </Box>
    <Text 
    className='TitleHeader'
    >{primeraMayuscula(title)}</Text>
    <Flex
    className="cardsContainer"
    direction="row"
    wrap="wrap"
    gap="5rem"
    padding="1rem"
    maxW="100%"
    >
      {products.map((product) => (
        <Card 
        className='sliders-fotos'
        key={product.id} 
        maxW="md" 
        minW="250px" 
        flex="0 0 auto">
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
              <Heading size="sm">{product.title}</Heading>
              <Text maxW={"16rem"}>{product.description}</Text>
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
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="3" _hover={{
                backgroundColor: "rgba(237, 237, 78, 0.737)",
                transform: "scale(1.1)",
                borderRadius: "2px",
                height: "25px",
                width: "110px",
                color: "black",
                paddingLeft: "10px",
              }}>
              <Link to={`/item/${product.id}`}>Ir a Detalle</Link>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Flex>
        </>
    )
}