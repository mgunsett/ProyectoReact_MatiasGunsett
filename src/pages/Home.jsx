import React from "react";
import { ItemsListContainer } from "../components";
import { useItemsCollection } from "../hooks";
import { 
  Flex,  
  Box,
  Img,
  Heading,
  Input,
  Text, 
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import logoAngel from "../assets/logoAngel.png";
import fotoMain3 from "../assets/fotoMain3.jpg";
import fotoFamily from '../assets/fotoFamily.jpg'
import './Styles/Home.css';
import './Styles/Mediaquerys.css';
import { SkeletonLoading } from "../components/SkeletonLoading";

export const Home = () => {

  const { items, loading, error } = useItemsCollection("products"); 
  //y aca le pasamos como parametro a la hooks que customizamos el nombre de la "Coleccion" //

  return loading ? (
    <SkeletonLoading />   
  ) : (
    <Box backgroundColor={('gray.200', 'gray.700')} height={'100%'}>
    <ItemsListContainer title={"Productos"} products={items} />
    <Flex className="promociones">
      <Box>
        <Img src={logoAngel} alt="Logo principal" width={"80px"} height={"80px"}/>
      </Box>
      <Box maxW={'35%'} textAlign={'left'} pl={5}> 
        <Heading as='h2' size='lg'>15% DE DESCUENTO EN TU PRIMERA COMPRA ONLINE!</Heading>
        <Text>Suscríbete ahora para recibir las ultimas informaciones y ofertas exclusivas.</Text>
      </Box>
      <Flex className='promociones-suscribe' gap={5}>
        <Text>Dejanos tu email para suscribirte </Text>
        <Input variant='filled' placeholder='Introducir E-mail' />
        <Button className='promociones-button' variant='solid' colorScheme='teal'>
          Suscribirme
        </Button>
      </Flex>
    </Flex>
    <Flex className="quienesSomos"  >
      <Box className="quienesSomos-text">
        <Heading as={"h2"} fontSize={{sm:'40px',lg:'50px', xl:'60px' }} className="quienesSomos-text-h">BeReal <strong>Family</strong></Heading>
        <Text className="quienesSomos-text-p">"Somos una grupo de amigos que un día entre risas, asados y play decidimos emprender un camino juntos y en algo que nos apasionara a todos. Asi fue que nacio BeReal, construyendo paso a paso cada estilo, cada diseño y cada detalle para ser de nuestro trabajo la mejor experiencia para todos."  </Text>
      </Box>
      <Box className="quienesSomos-imgs">
      <Img
      className="quienesSomos-img"
      src={fotoFamily}
      alt='Logo BeReal' 
      />
      </Box>
    </Flex>
    <Grid
      w={'100%'}
      h='700px'
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}
      p
    >
      <GridItem rowSpan={2} colSpan={2}>
        <Img
        className="fotoMain1" 
        src={fotoMain3}
        objectFit={'cover'} 
        height={'575px'}
        width={'700px'} 
        alt="Logo principal"
        />
      </GridItem>
      <GridItem rowSpan={2} colSpan={1}>
        <Img 
        className="fotoMain1"
        src={fotoMain3}
        objectFit={'cover'} 
        height={'575px'}
        width={'700px'} 
        alt="Logo principal"
        />
      </GridItem>
      <GridItem  rowSpan={1} colSpan={2} >
        <Img 
        className="fotoMain1"
        src={fotoMain3} 
        objectFit={'cover'}  
        height={'275px'}
        width={'650px'}
        alt="Logo principal"
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Img 
        className="fotoMain1"
        src={fotoMain3} 
        objectFit={'cover'}
        height={'285px'} 
        width={'650px'}
        alt="Logo principal"/>  
      </GridItem>
    </Grid>
    </Box>
  );
};