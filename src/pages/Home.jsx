import React from "react";
import { ItemsListContainer } from "../components";
import { useItemsCollection } from "../hooks";
import { 
  Container, 
  Flex, 
  Spinner, 
  Box,
  Img,
  Heading,
  Input,
  Text, 
  Button
} from "@chakra-ui/react";
import logoAngel from "../assets/logoAngel.png";
import fotoMain1 from "../assets/fotoMain1.jpg";
import fotoMain2 from "../assets/fotoMain2.jpg";
import fotoMain3 from "../assets/fotoMain3.jpg";
import fotoFamily from '../assets/fotoFamily.jpg'
import './Styles/Home.css';

export const Home = () => {

  const { items, loading, error } = useItemsCollection("products"); 
  //y aca le pasamos como parametro a la hooks que customizamos el nombre de la "Coleccion" //

  return loading ? (
    <Flex justifyContent= {"center"} alignItems={"center"} h={"90vh"}>
      <Spinner />
    </Flex>
  ) : error ? (
    <Box>
      Hay un error durante la carga de los productos, por favor contactese con
      soporte.
    </Box>
  ) : (
    <Container maxW={'100%'}>
    <ItemsListContainer title={"Productos"} products={items} />

    <Box className="quienesSomos">
      <Box className="quienesSomos-text">
        <Heading className="quienesSomos-text-h">Familia BeReal </Heading>
        <Text className="quienesSomos-text-p">"Somos una grupo de amigos que un día entre risas, asados y play decidimos emprender un camino juntos y en algo que nos apasionara a todos. Asi fue que nacio BeReal, construyendo paso a paso cada estilo, cada diseño y cada detalle para ser de nuestro trabajo la mejor experiencia para todos."  </Text>
      </Box>
      <Img
      className="quienesSomos-img"
      src={fotoFamily}
      alt='Logo BeReal' 
      />
    </Box>

    <Flex 
    justifyContent={'center'} 
    gap={5}
    alignItems={'center'}
    maxW={'100%'}
    padding={'30px'}
    background={'rgba(255, 99, 71, 0.37)'}
    marginTop={'80px'}>
      <Box 
      maxWidth={'100%'} 
      height={'400px'}
      width={'450px'}
      overflow={'hidden'}
      >
        <Img 
        className="home-fotos"
        src={fotoMain1} 
        objectFit={'cover'}  
        height={'500px'}
        width={'450px'}
        alt="Logo principal"
        />
      </Box>
      <Box 
      maxWidth={'100%'} 
      height={'620px'}
      width={'450px'}
      overflow={'hidden'}
      >
        <Img 
        className="home-fotos"
        src={fotoMain3}
         objectFit={'cover'} 
         height={'620px'} 
         alt="Logo principal"
         />
      </Box>
      <Box
      maxWidth={'100%'} 
      height={'400px'}
      overflow={'hidden'}
      width={'450px'}
      >
        <Img 
        className="home-fotos"
        src={fotoMain2} 
        objectFit={'cover'}
        height={'400px'} 
        width={'450px'}
        alt="Logo principal"/>
      </Box>
    </Flex>
    <Flex 
    justifyContent={'center'} 
    alignItems={'center'} 
    paddingTop={'30px'}
    paddingBottom={'90px'}
    marginTop={'90px'} 
    marginBottom={'90px'}
    gap={5} 
    maxW={'100wh'}
    background={'rgb(45, 45, 119)'}
    opacity={0.9}
    >
      <Box>
        <Img src={logoAngel} alt="Logo principal" width={"80px"} height={"80px"}/>
      </Box>
      <Box maxW={'35%'} textAlign={'left'} pl={5}> 
        <Heading as='h2' size='lg'>15% DE DESCUENTO EN TU PRIMERA COMPRA ONLINE!</Heading>
        <Text>Suscríbete ahora para recibir las ultimas informaciones y ofertas exclusivas.</Text>
      </Box>
      <Flex 
      justifyContent={'center'} 
      alignItems={'center'} 
      gap={5}
      paddingLeft={'40px'}
      >
        <Text>Dejanos tu email para suscribirte </Text>
        <Input variant='filled' placeholder='Introducir E-mail' />
        <Button className='home-button-suscribete' variant='solid' colorScheme='teal'>
          Suscribirme
        </Button>
      </Flex>
    </Flex>
    </Container>
  );
};