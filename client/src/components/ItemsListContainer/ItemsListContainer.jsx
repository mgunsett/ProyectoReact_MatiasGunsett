import { Heading, Box, Image, Flex} from '@chakra-ui/react';
import './ListContainer.css';
import bannerNuevo from '../../assets/bannerNuevo.png'
import { SlidersCards } from '../SliderCards';

export const ItemsListContainer = ({ title, products }) => {

  function primeraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <Flex  margin={'auto'} flexDirection={'column'} gap={'20px'} backgroundColor={'white'}>
      <Box className='titleContainer' position={'relative'}>
        <Image
          className='banner'
          src={bannerNuevo}
          objectFit={'contain'}
          alt='Banner'
          opacity={0.9}
          margin={'auto'}
          marginTop={{ base: '80px', sm: '80px', lg: '80px' }}
          boxSize={{ base: '220px', sm: '250px', lg: '450px' }}	
        />
      </Box>
      <Heading 
      className='title2-container'
      as={'h1'}
      color={'black'}
      lineHeight={1.1}
      fontWeight={400}
      fontSize= {{ base: "50px", sm: "30px", md: '45px' , lg: "50px" }}
      fontFamily={'"Bebas Neue", system-ui'}
      fontStyle={'normal'}
      justifyContent={{ base: 'center', sm: 'center', md: 'flex-start' }}
      >{primeraMayuscula(title)}</Heading>

      <SlidersCards products={products}/>
    </Flex>
  );
};


 // Aplicar gradient al texto //
      // bgGradient="linear(to-t, black, white)"
      // bgClip="text"