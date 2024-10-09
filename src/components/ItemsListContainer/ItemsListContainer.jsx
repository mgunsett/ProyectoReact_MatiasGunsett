import {
  Heading,
  Container,
  Box,
  Divider,
  Image,
} from '@chakra-ui/react';
import './ListContainer.css';
import bannerNuevo from '../../assets/bannerNuevo.png'
import spray  from '../../assets/spray.svg'
import { SlidersCards } from '../SliderCards';


export const ItemsListContainer = ({ title, products }) => {

  return (
    <Container maxW={'100%'} textAlign={'center'} margin={0}>
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
          {title}
        </Heading>
      </Box>

      <Divider 
      orientation={'horizontal'} 
      maxW={'97%'} 
      padding={'5'}
      marginBottom={'40px'} />

      <SlidersCards products={products}/>
    </Container>
  );
};
