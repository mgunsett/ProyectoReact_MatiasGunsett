import {
  Heading,
  Container,
  Box,
  Divider,
  Image,
} from '@chakra-ui/react';
import './ListContainer.css';
import banner from '../../assets/banner.png'
import { SlidersCards } from '../SliderCards';

export const ItemsListContainer = ({ title, products }) => {

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
        <Heading
          fontFamily={'Whisper, cursive'}
          size={'lg'}
          fontSize={'60px'}
          style={{ color: 'rgba(0, 0, 0, 0.641)' }}
          position={'absolute'}
          top={'19%'}
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
