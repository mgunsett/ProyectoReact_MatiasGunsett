import { Heading, Box, Flex} from '@chakra-ui/react';
import './ListContainer.css';
import { SlidersCards } from '../SliderCards';
import { useEffect, useState } from 'react';

export const ItemsListContainer = ({ title, products }) => {

  const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setVisible(true);
        } else {
          setVisible(false);
        }

      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  function primeraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }


  return (
    <Flex  
      margin={'auto'} 
      flexDirection={'column'} 
      gap={'20px'} 
      backgroundColor={'white'}
    >
      <Box className='titleContainer'></Box>
      <Heading 
      className={`title ${visible ? 'reveal--visible' : ''}`}
      display={'flex'}
      as={'h1'}
      color={'black'}
      lineHeight={1}
      fontWeight={400}
      fontSize= {{ base: "90px", sm: "90px", md: '100px' , lg: "110px" }}
      fontFamily={'"Bebas Neue", system-ui'}
      justifyContent={'flex-start'}
      mb={'-30px'}
      ml={{base: '0', sm: '15px'}}
      >{primeraMayuscula(title)}</Heading>

      <SlidersCards products={products}/>
    </Flex>
  );
};