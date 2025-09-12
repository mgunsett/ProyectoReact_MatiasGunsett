import { useEffect, useState } from "react";
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
import { FaTruckArrowRight } from "react-icons/fa6";
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
  }, [loading, items]);

  // --------------------------------------------------------------------- //

  // Estado para manejar Hover de las imagenes ---------------------------//
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const images = [
    { src: fotoMain1, alt: 'Imagen 1' },
    { src: fotoMain5, alt: 'Imagen 2' },
    { src: fotoMain, alt: 'Imagen 3' },
    { src: fotoMain6, alt: 'Imagen 4' },
  ];
  // --------------------------------------------------------------------- //
  return loading ? (
    <SkeletonLoading />
  ) : (
    <Box backgroundColor={'white'} height={'100%'} paddingBottom={'140px'}>
      <ItemsListContainer title={"Productos"} products={items} />
      <Flex
        className="promociones"
        gap={5}
      >
        <Img
          src={logoAngel}
          alt="Logo principal"
          width={{ base: '70px', sm: '80px' }}
          height={{ base: '70px', sm: '80px' }}
        />
        <Box
          maxW={{ base: '50%', sm: '60%', md: '40%', lg: '35%' }}
          textAlign={'left'}
          pl={{ base: 0, sm: 1, md: 5 }}
        >
          <Heading
            as='h2'
            fontSize={{ base: '15px', sm: '15px', md: '20px', lg: '25px' }}
          >
            15% DE DESCUENTO EN TU PRIMERA COMPRA ONLINE!
          </Heading>
          <Text
            fontSize={{ sm: '12px', md: '15px', lg: '20px' }}
            display={{ base: 'none', sm: 'block' }}
          >Suscríbete ahora para recibir las ultimas informaciones y ofertas exclusivas.</Text>
        </Box>
        <Flex
          justifyContent={{ base: 'flex-start', sm: 'flex-start', md: 'center', lg: 'center' }}
          paddingLeft={{ base: '20px', sm: '30px', md: '40px' }}
          paddingBottom={'20px'}
          gap={2}
          alignItems={{ base: 'center', sm: 'flex-start', md: 'center', lg: 'center' }}
          flexDirection={'row'}
        >
          <Button
            variant='outline'
            colorScheme='whiteAlpha'
            padding={{ base: '10px', sm: '10px', md: '15px', lg: '50px' }}
            fontSize={{ base: '10px', sm: '12px', md: '15px', lg: '30px' }}
            fontFamily={'"Bebas Neue", system-ui'}
            fontWeight={600}
            color={'white'}
          >
            SALE ➡️
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={5}
      >
        <Heading
          as="h2"
          fontSize={{ base: '20px', sm: '25px', md: '30px', lg: '135px' }}
          mt={8}
          fontFamily={'"Bebas Neue", system-ui'}
          fontWeight={200}
          lineHeight={1}
          color={'black'}
        >
          Destacado
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : randomProduct ? (
          <HomeDetailContainer product={randomProduct} />
        ) : (
          <Text>No hay productos destacados♠</Text>
        )}
      </Flex>
      <Flex className="bannerInfo">
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={4}
        >
          <FaTruckArrowRight
            className="fi fi-brands-truck-arrow-right"
          />
          <Text
            fontSize={{ base: '12px', sm: '17px', md: '18px' }}
            fontFamily={'"Bebas Neue", system-ui'}
            marginTop={'-5px'}
          >
            Envios a todo el País
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <i class="fi fi-rs-shield-check" />
          <Text
            fontSize={{ base: '12px', sm: '17px', md: '18px' }}
            fontFamily={'"Bebas Neue", system-ui'}
          >
            Tu pago asegurado
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={1}
        >
          <i class="fi fi-brands-whatsapp" />
          <Text
            fontSize={{ base: '12px', sm: '17px', md: '18px' }}
            fontFamily={'"Bebas Neue", system-ui'}
            marginTop={'-5px'}
          >
            Atención 24/7
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
        justifyContent={'space-between'}
        border={'1px solid black'}
        height={{ base: '750px', md: '700px' }}
        backgroundColor={'rgb(0, 0, 0)'}
        mb={'90px'}
      >
        <Flex
          flexDirection={'column'}
          alignItems={'flex-start'}
          padding={'20px'}
          backgroundColor={'rgb(0, 0, 0)'}
          margin={'auto'}
        >
          <Heading
            as={"h2"}
            fontSize={{ base: '40px', sm: '45px', lg: '50px', xl: '55px' }}
            fontFamily={'"Bebas Neue", system-ui'}
            marginBottom={'-48px'}
            color={'white'}
          >
            BeReal
          </Heading>
          <Text
            fontSize={{ base: '110px', sm: '115px', lg: '120px', xl: '125px' }}
            fontFamily={'"Bebas Neue", system-ui'}
            marginBottom={'-40px'}
            color={'white'}
          >
            Family
          </Text>

          <Text
            lineHeight={{ base: '20px', sm: '30px', md: '40px' }}
            fontFamily={'"Bebas Neue", system-ui'}
            fontWeight={100}
            fontSize={{ base: '25px', sm: '20px', md: '25px' }}
            height={{ base: '250px' }}
            width={{ base: '100%', sm: '80%', md: '400px' }}
            margin={{ base: 'none', sm: '10px', md: '10px' }}
            color={'white'}
          >
            "Somos una grupo de amigos que un día entre risas, asados y play decidimos emprender un camino juntos y en algo que nos apasionara a todos. Asi fue que nacio BeReal, construyendo paso a paso cada estilo, cada diseño y cada detalle para ser de nuestro trabajo la mejor experiencia para todos."
          </Text>
        </Flex>
        <Box
          width={{ base: '100%', sm: '100%', md: '50%', lg: '50%' }}
          mt={'-120px'}
        >
        <Img
          height={{ base: '500px', md: '700px' }}
          width={'100%'}
          src={fotoFamily}
          alt='Logo BeReal'
          objectFit={{ base: 'contain', md: 'cover' }}
        />
        </Box>
      </Flex>
      <Grid
        w={'90%'} 
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(8, 1fr)'
        gap={1}
        margin={'auto'}
        mt={5}
      >
        {images.map((image, index) => (
          <GridItem
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            rowSpan={2}
            colSpan={hoveredIndex === null ? 2 : hoveredIndex === index ? 5 : 1}
            overflow={'hidden'}
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
    </Box>
  );
};