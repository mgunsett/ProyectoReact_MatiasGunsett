import {
  Heading,
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  Image,
  Text,
} from '@chakra-ui/react';
import './ListContainer.css';
import { Link } from "react-router-dom";


export const ItemsListContainer = ({title , products}) => {
    return (
      <Container maxW={'100%'} textAlign={'center'}  margin={0}>
        <Box className='titleContainer'>
          <Heading fontFamily={'Bowlby One, sans-serif'} size={'lg'} fontSize={'130px'}>{title}</Heading>
          <Button size='lg' colorScheme='blue' mt='24px'>
            Comenzar!
          </Button>
        </Box>

        <Divider orientation={'horizontal'} margin={'auto'} maxW={'90%'} padding={'3'}/>
        
        <Box className='cardsContainer'>
          {products.map((product) => (
        // <Card key={index} maxW="sm" marginTop={"1rem"}> // Podria usar 'index' en caso de que no hubiera ID --
        <Card key={product.id} maxW="md" margin={"1rem"} >
          <CardBody>
            <Image 
              src={product.thumbnail} 
              alt={product.name} 
              borderRadius="md" 
              boxSize='320px'
              objectFit='cover' 
              maxW={'20rem'}
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.title}</Heading>
              <Text textAlign={'left'}>
                {product.description}
              </Text>
              <Text color="blue.600" fontSize="2xl" fontFamily={'fantasy'}>
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Link to={`./item/${product.id}`}>
                Ir a Detalle
              </Link>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Box>
    </Container>
    )
};
