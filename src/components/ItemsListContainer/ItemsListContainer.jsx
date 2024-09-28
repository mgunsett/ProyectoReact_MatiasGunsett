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
import banner from '../../assets/banner.png'


export const ItemsListContainer = ({title , products}) => {

  // const categories = products.map((product) => product.category);
  // Set es una estructura de datos que no permite duplicados
  // const uniqueCategories = [...new Set(categories)];
  // console.log(uniqueCategories)

    return (
      <Container maxW={'100%'} textAlign={'center'} margin={0}>
        <Box className='titleContainer'>
          <Image
            src={banner}
            alt='Banner'
            objectFit='cover'
            opacity={0.8}
            maxW={'60%'}
            margin={'auto'}  
          />
          <Heading fontFamily={'Bowlby One, sans-serif'} size={'lg'} fontSize={'30px'}>{title}</Heading>
        </Box>

        <Divider orientation={'horizontal'} margin={'auto'} maxW={'90%'} padding={'5'}/>
        
        <Box className='cardsContainer'>
          {products.map((product) => (
        // <Card key={index} maxW="sm" marginTop={"1rem"}> // Podria usar 'index' en caso de que no hubiera ID -- 
        <Card key={product.id} maxW="md" margin={"1rem"} >
          <CardBody>
            <Link to={`/item/${product.id}`}>
              <Image 
                src={product.imageUrl} 
                alt={product.title} 
                borderRadius="md" 
                boxSize='250px'
                objectFit='cover' 
                maxW={'20rem'}
              />
            </Link>
            <Stack textAlign={'left'} mt="6" spacing="2">
              <Heading size="sm">{product.title}</Heading>
              <Text maxW={'16rem'}>
                {product.description}
              </Text>
              <Text color="blue.500" fontSize="2xl" fontFamily={'fantasy'} fontWeight={'100'}>
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Link 
              to={`/item/${product.id}`}
              >
                {" "}
                Ir a Detalle{""}
              </Link>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Box>
    </Container>
    )
};
