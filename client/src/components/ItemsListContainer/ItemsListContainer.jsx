import {
  Heading,
  Box,
  Image,
  Flex,
} from '@chakra-ui/react';
import './ListContainer.css';
import bannerNuevo from '../../assets/bannerNuevo.png'
import spray  from '../../assets/spray.svg'
import { SlidersCards } from '../SliderCards';


export const ItemsListContainer = ({ title, products }) => {

  function primeraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <Flex  margin={'auto'} flexDirection={'column'} gap={'20px'} backgroundColor={('gray.200', 'gray.700')}>
      <Box className='titleContainer' position={'relative'}>
        <Image
          className='banner'
          src={bannerNuevo}
          objectFit={'contain'}
          alt='Banner'
          opacity={0.9}
          margin={'auto'}
          marginTop={{ base: '80px', sm: '80px', lg: '50px' }}
          boxSize={{ base: '220px', sm: '250px', lg: '450px' }}	
        />
      </Box>
      <Heading 
      className='title2-container'
      as={'h1'}
      // Aplicar gradient al texto //
      // bgGradient="linear(to-t, black, white)"
      // bgClip="text"
      color={"rgba(237, 237, 78, 0.737)"}
      lineHeight={1.1}
      fontWeight={600}
      fontSize= {{ base: "30px", sm: "30px", md: '35px' , lg: "40px" }}
      fontFamily={'"Lacquer", system-ui'}
      >{primeraMayuscula(title)}</Heading>

      <SlidersCards products={products}/>
    </Flex>
  );
};
