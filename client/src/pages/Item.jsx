import React from "react";
import { useParams } from "react-router";
import { ItemDetailContainer,SlidersCards } from "../components"
import { useProductById, useItemsCollection } from "../hooks";
import { Flex, Spinner, Box, Text, Image } from "@chakra-ui/react";
import abeja from '../assets/abeja.svg';
import './Styles/Item.css';

export const Item = () => { 

  // useParams: hook que permite acceder a los parametros de la URL
  const { id } = useParams();
  const { productData, loading } = useProductById(id);
  
  // Obtener todos los productos para el slider
  const { items: products, loading: productsLoading } = useItemsCollection("products");

  return loading || productsLoading ? (
    <Flex
      width={"100%"}
      height={"90vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size="xl" />
    </Flex>
  ) : (
    <Box 
      background={'rgb(255, 255, 255)'}
      marginTop={'-62px'}
    >
      <Box
      w={"100%"}
      h={16}
      backgroundColor="rgba(229, 223, 223, 0.578)"
      backdropBlur={'5px'}
      mb={'2rem'}
      ></Box>
      <ItemDetailContainer  product={productData}/>
      <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      >
      <Text
      fontSize={{base: "60px", md:"100px", lg: "110px"}}
      fontFamily={'"Bebas Neue", system-ui'}
      color={'black'}
      alignSelf={'flex-start'}
      ml={{base: "20px", md: "195px"}}
      >
        Recomendados
      </Text>
      <Image 
      src={abeja}
      alt="abeja"
      width={{base: "250px", md: "350px"}}
      height={{base: "250px", md: "350px"}}
      position={'absolute'}
      top={"-30px"}
      left={"-50px"}
      zIndex={1}
      display={{base: "none", md: "block"}}
      />
      <Image 
      src={abeja}
      alt="abeja"
      width={{base: "350px", md: "350px"}}
      height={{base: "350px", md: "350px"}}
      position={'absolute'}
      bottom={"650px"}
      right={"-130px"}
      zIndex={1}
      />
      <Image 
      src={abeja}
      alt="abeja"
      width={{base: "250px", md: "350px"}}
      height={{base: "250px", md: "350px"}}
      position={'absolute'}
      bottom={"0px"}
      left={"-60px"}
      zIndex={1}
      display={{base: "none", md: "block"}}
      />
      <Box
      w={{base: "100%", md: "82%"}}
      p={2}
      mt={{base: "-40px", md: "-70px"}}
      marginBottom={'80px'}
      >
        <SlidersCards products={products}/>
      </Box>
      </Flex>
    </Box>
  );
};