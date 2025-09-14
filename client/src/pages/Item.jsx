import React from "react";
import { useParams } from "react-router";
import { ItemDetailContainer,SlidersCards } from "../components"
import { useProductById, useItemsCollection } from "../hooks";
import { Flex, Spinner, Box, Text } from "@chakra-ui/react";
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
      <Box
      w={{base: "100%", md: "82%"}}
      p={2}
      mt={'-70px'}
      marginBottom={'80px'}
      >
        <SlidersCards products={products}/>
      </Box>
      </Flex>
    </Box>
  );
};