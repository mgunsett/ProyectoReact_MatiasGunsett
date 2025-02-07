import React from "react";
import { useParams } from "react-router";
import { ItemDetailContainer } from "../components";
import { useProductById } from "../hooks";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import './Styles/Item.css';

export const Item = () => {

  // useParams: hook que permite acceder a los parametros de la URL
  const { id } = useParams();
  const { productData, loading } = useProductById(id);

  return loading ? (
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
      className="container" 
      backgroundColor={('gray.200', 'gray.700')}
      paddingTop={20}
      marginTop={-16}
    >
    <ItemDetailContainer  product={productData}/>
    </Box>
  );
};