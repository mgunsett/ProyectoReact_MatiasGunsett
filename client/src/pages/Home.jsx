import React, { useEffect, useState } from "react";
import { ItemsListContainer, HomeDetailContainer } from "../components";
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
  GridItem
} from "@chakra-ui/react";
import logoAngel from "../assets/logoAngel.png";
import fotoMain1 from '../assets/fotoMain1.jpg';
import fotoMain2 from '../assets/fotoMain2.jpg';
import fotoMain5 from '../assets/fotoMain5.jpg';
import fotoMain4 from '../assets/fotoMain4.webp';
import fotoFamily from '../assets/fotoFamily.jpg';
import tarjeta_cred from '../assets/tarjeta_cred.png';
import envio_moto from '../assets/envio_moto.png';
import atencion_wsp from '../assets/atencion_wsp.png';
import './Styles/Home.css';
import './Styles/Mediaquerys.css';
import { SkeletonLoading } from "../components/SkeletonLoading";

export const Home = () => {
  //y aca le pasamos como parametro a la hooks que customizamos el nombre de la "Coleccion" //
  const { items, loading } = useItemsCollection("products"); 
  
  // Estado para guardar un producto aleatorio ---------------------------//
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    if (!loading && items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setRandomProduct(items[randomIndex]);
    }
  }, [ loading, items ]);
// --------------------------------------------------------------------- //

  return loading ? (
    <SkeletonLoading />   
  ) : (
    <Box backgroundColor={('gray.200', 'gray.700')} height={'100%'}>
      <ItemsListContainer title={"Productos"} products={items} />
      <Flex className="promociones">
        <Box>
          <Img src={logoAngel} alt="Logo principal" width={"80px"} height={"80px"}/>
        </Box>
        <Box 
          maxW={{ base: '40%', sm: '60%', md: '35', lg: '30%' }} 
          textAlign={'left'} 
          pl={{ base: 0, sm: 1, md: 5}}
        > 
          <Heading 
            as='h2' 
            size={{ base: '12px', sm: '15px', md: '30px', lg: '40px' }}
          >
            15% DE DESCUENTO EN TU PRIMERA COMPRA ONLINE!
          </Heading>
          <Text
            fontSize={{ base: '10px', sm: '12px', md: '15px', lg: '20px' }}
          >Suscríbete ahora para recibir las ultimas informaciones y ofertas exclusivas.</Text>
        </Box>
        <Flex className='promociones-suscribe' 
          gap={{ base: 2, sm: 2, md: 4, lg: 5 }}
          alignItems={{ base: 'center', sm: 'flex-start', md: 'center', lg: 'center'}}
          flexDirection={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }}
        >
          <Input variant='filled' placeholder='Introducir E-mail' />
          <Button className='promociones-button' variant='solid' colorScheme='teal'>
            Suscribirme
          </Button>
        </Flex>
      </Flex>
      <Flex className="quienesSomos"  >
        <Box className="quienesSomos-text">
          <Heading as={"h2"} fontSize={{sm:'30px',lg:'40px', xl:'50px' }} className="quienesSomos-text-h">BeReal <strong>Family</strong></Heading>
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
        w={'85%'}
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={1}
        margin={'auto'}
      >
        <GridItem rowSpan={2} colSpan={2}>
          <Img
          className="fotoMain1" 
          src={fotoMain1}
          objectFit={'cover'} 
          height={'500px'}
          width={'600px'} 
          alt="Logo principal"
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <Img 
          className="fotoMain1"
          src={fotoMain5}
          objectFit={'cover'} 
          height={'500px'}
          width={'600px'} 
          alt="Logo principal"
          />
        </GridItem>
        <GridItem  rowSpan={1} colSpan={2} >
          <Img 
          className="fotoMain1"
          src={fotoMain2} 
          objectFit={'cover'}  
          height={'250px'}
          width={'550px'}
          alt="Logo principal"
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <Img 
          className="fotoMain1"
          src={fotoMain4} 
          objectFit={'cover'}
          height={'250px'} 
          width={'550px'}
          alt="Logo principal"/>  
        </GridItem>
      </Grid>
      <Flex className="bannerInfo">
        <Box textAlign="center">
          <Img 
            src={envio_moto} 
            alt="Pago en Cuotas" 
            boxSize="90px" 
            m={'auto'}
          />
          <Text 
            fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'xl' }}
            mt={3}
            fontFamily={'"Lacquer", system-ui, sans-serif'}
            maxWidth={'250px'}
          >
            Envio GRATIS a partir de $20.000
          </Text>
        </Box>
        <Box textAlign="center">
          <Img 
            src={tarjeta_cred} 
            alt="Pago en Cuotas" 
            boxSize="90px" 
            m={'auto'}
          />
          <Text 
            fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'xl' }}
            mt={3}
            fontFamily={'"Lacquer", system-ui, sans-serif'}
            maxWidth={'200px'}
          >
            3 Cuotas sin Interes!
          </Text>
        </Box>
        <Box textAlign="center">
          <Img
            src={atencion_wsp} 
            alt="Pago en Cuotas" 
            boxSize="70px" 
            m={'auto'}
          />
          <Text 
            fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'xl' }}
            mt={3}
            fontFamily={'"Lacquer", system-ui, sans-serif'}
            maxWidth={'200px'}
          >
            Atención 24/7
          </Text>
        </Box>
      </Flex>
      <Flex direction="column" align="center" justify="center" p={5}>
      <Heading 
        as="h2" 
        size="2xl" 
        m={8} 
        fontFamily={'"Bungee Tint", sans-serif'}
      >
        Destacado
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : randomProduct ? (
        <HomeDetailContainer product={randomProduct} />
      ) : (
        <Text>No hay productos destacados</Text>
      )}
    </Flex>
    </Box>
  );
};