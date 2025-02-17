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
import fotoMain from '../assets/fotoMain.jpg';
import fotoMain5 from '../assets/fotoMain5.jpg';
import fotoMain6 from '../assets/fotoMain6.jpg';
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
  
  // Estado para mostrar un producto aleatorio ---------------------------//
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    if (!loading && items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setRandomProduct(items[randomIndex]);
    }
  }, [ loading, items ]);
// --------------------------------------------------------------------- //
  
// Estado para manejar Hover de las imagenes ---------------------------//
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const images = [
    { src: fotoMain1, alt: 'Imagen 1'},
    { src: fotoMain5, alt: 'Imagen 2'},
    { src: fotoMain, alt: 'Imagen 3'},
    { src: fotoMain6, alt: 'Imagen 4'},
  ];
// --------------------------------------------------------------------- //
  return loading ? (
    <SkeletonLoading />   
  ) : (
    <Box backgroundColor={('gray.200', 'gray.700')} height={'100%'} paddingBottom={'150px'}>
      <ItemsListContainer title={"Productos"} products={items} />
      <Flex className="promociones" gap={5}>
          <Img 
            src={logoAngel} 
            alt="Logo principal" 
            width={{ base: '70px', sm: '80px'}} 
            height={{ base: '70px', sm: '80px'}}
          />
        <Box 
          maxW={{ base: '50%', sm: '60%', md: '40%', lg: '35%' }} 
          textAlign={'left'} 
          pl={{ base: 0, sm: 1, md: 5}}
        > 
          <Heading 
            as='h2' 
            fontSize={{ base: '15px', sm: '15px', md: '20px', lg: '25px' }}
          >
            15% DE DESCUENTO EN TU PRIMERA COMPRA ONLINE!
          </Heading>
          <Text
            fontSize={{ sm: '12px', md: '15px', lg: '20px' }}
            display={{ base: 'none', sm: 'block'}}
          >Suscríbete ahora para recibir las ultimas informaciones y ofertas exclusivas.</Text>
        </Box>
        <Flex
          justifyContent={{ base: 'flex-start', sm: 'flex-start', md: 'center', lg: 'center'}}
          paddingLeft={{ base: '20px', sm: '30px', md: '40px'}}
          paddingBottom={'20px'}
          gap={2}
          alignItems={{ base: 'center', sm: 'flex-start', md: 'center', lg: 'center'}}
          flexDirection={'row'}
        >
          <Input 
            variant='filled' 
            placeholder='Introducir E-mail' 
            size={{ base: 'sm', sm: 'md', md: 'md', lg: 'lg' }}
          />
          <Button 
            variant='solid'
            colorScheme='teal'
            padding={{ base: '10px', sm: '10px', md: '15px', lg: '15px' }}
            fontSize={{ base: '10px', sm: '12px', md: '15px', lg: '15px' }}
          > 
            Suscribirme
          </Button>
        </Flex>
      </Flex>
      <Flex 
        className="quienesSomos"
        gap={{ base: 5, sm: 5, md: 10, lg: 10 }}
        flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
        justifyContent={'center'}
        
        margin={'auto'}
        padding={{ base: '20px', sm: '30px', md: '40px', lg: '40px' }}
      >
        <Box 
          className="quienesSomos-text"
        >
            <Heading 
              as={"h2"} 
              fontSize={{base:'30px' ,sm:'30px',lg:'40px', xl:'50px' }} 
              fontFamily={'"Bungee Tint", sans-serif'}
            >
              BeReal 
            </Heading>
            <Text 
              fontSize={{base:'50px' ,sm:'60px',lg:'80px', xl:'90px' }}
              fontFamily={'"Bungee Tint", sans-serif'}
            >
              Family
            </Text>
          
          <Text className="quienesSomos-text-p"
            fontSize={{base:'15px' ,sm:'20px',md:'25px'}}
            height={{base: '250px'}}>
            "Somos una grupo de amigos que un día entre risas, asados y play decidimos emprender un camino juntos y en algo que nos apasionara a todos. Asi fue que nacio BeReal, construyendo paso a paso cada estilo, cada diseño y cada detalle para ser de nuestro trabajo la mejor experiencia para todos." 
          </Text>
        </Box>
        
        <Img
        className="quienesSomos-img"
        width={{ base: '300px', sm: '360px', md: '680px', lg: '700px' }}
        height={{ base: '380px', sm: '460px', md: '570px', lg: '580px' }}
        src={fotoFamily}
        alt='Logo BeReal' 
        />
     
      </Flex>
      <Grid
      w={'85%'}
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(8, 1fr)'
      gap={1}
      margin={'auto'}
    >
      {images.map((image, index) => (
        <GridItem 
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          rowSpan= {2}
          colSpan={hoveredIndex === null ? 2 : hoveredIndex === index ? 4 : 1}
          overflow={'hidden'}
          sx={{
            transitionProperty: 'all',
            transitionDuration: '0.5s',
            transitionTimingFunction: 'ease-in-out',
          }}  
        > 
          <Img
            src={image.src}
            objectFit={'cover'}
            height={'500px'}
            width={'100%'}
            alt={image.alt}
          />
        </GridItem>
      ))}
    </Grid>
      <Flex className="bannerInfo">
        <Box textAlign="center">
          <Img 
            src={envio_moto} 
            alt="Pago en Cuotas" 
            boxSize={{ base: '50px', sm: '70px', md: '90px'}} 
            m={'auto'}
          />
          <Text 
            fontSize={{ base: '12px', sm: '15px', md: '16px'}}
            mt={3}
            fontFamily={'"Lacquer", system-ui, sans-serif'}
            maxWidth={{ base: '80px', sm: '90px', md: '150px'}}
          >
            Envios a todo el País
          </Text>
        </Box>
        <Box textAlign="center">
          <Img 
            src={tarjeta_cred} 
            alt="Pago en Cuotas" 
            boxSize={{ base: '50px', sm: '70px', md: '90px'}}  
            m={'auto'}
          />
          <Text 
            fontSize={{ base: '12px', sm: '15px', md: '16px'}}
            mt={3}
            fontFamily={'"Lacquer", system-ui, sans-serif'}
            maxWidth={{ base: '80px', sm: '90px', md: '150px'}}
          >
            3 Cuotas sin Interes!
          </Text>
        </Box>
        <Box textAlign="center">
          <Img
            src={atencion_wsp} 
            alt="Pago en Cuotas" 
            boxSize={{ base: '30px', sm: '50px', md: '70px'}} 
            m={'auto'}
          />
          <Text 
            fontSize={{ base: '12px', sm: '15px', md: '16px'}}
            mt={4}
            fontFamily={'"Lacquer", system-ui, sans-serif'}
            maxWidth={{ base: '80px', sm: '90px', md: '150px'}}
          >
            Atención 24/7
          </Text>
        </Box>
      </Flex>
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        p={5}
      >
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

{/* <Grid
        w={'85%'}
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={1}
        margin={'auto'}
      >
        <GridItem 
          rowSpan={2} 
          colSpan={2}
          sx={{
            transition: "all 0.3s ease-in-out",
            _hover: { gridColumn: "span 4" }, // Expande la columna al pasar el mouse
          }}
        >
          <Img
          className="fotoMain1" 
          src={fotoMain1}
          objectFit={'cover'} 
          height={'500px'}
          width={'100%'} 
          alt="imagen 1"
          transition="all 0.3s ease-in-out"
          _hover={{ transform: "scale(1.1)" }}
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <Img 
          className="fotoMain2"
          src={fotoMain5}
          objectFit={'cover'} 
          height={'500px'}
          width={'100%'} 
          alt="imagen 2"
          />
        </GridItem>
        <GridItem  rowSpan={1} colSpan={2} >
          <Img 
          className="fotoMain3"
          src={fotoMain2} 
          objectFit={'cover'}  
          height={'250px'}
          width={'100%'}
          alt="imagen 3"
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <Img 
          className="fotoMain4"
          src={fotoMain4} 
          objectFit={'cover'}
          height={'250px'} 
          width={'100%'}
          alt="imagen 4" 
          />  
        </GridItem>
      </Grid> */}