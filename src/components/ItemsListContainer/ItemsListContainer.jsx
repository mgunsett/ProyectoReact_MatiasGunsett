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
          alt='Banner'
          objectFit='cover'
          opacity={0.9}
          maxW={'60%'}
          margin={'auto'}
        />
        <Image 
        className='spray'
        src={spray}
        alt='spray'
        width={'300px'}
        position={'absolute'}
        />
        <Heading
          fontFamily={'Whisper, cursive'}
          size={'lg'}
          fontSize={'60px'}
          style={{ color: 'rgba(0, 0, 0, 0.641)' }}
          position={'absolute'}
          top={'60%'}
          left={'45%'}
        >
          Be Real
        </Heading>
      </Box>
      <Heading 
      className='title2-container'
      lineHeight={1.1}
      fontWeight={600}
      fontSize= {{ base: "30px", sm: "40px", lg: "50px" }}
      fontFamily={'"Lacquer", system-ui'}
      >{primeraMayuscula(title)}</Heading>

      <SlidersCards products={products}/>
    </Flex>
  );
};
