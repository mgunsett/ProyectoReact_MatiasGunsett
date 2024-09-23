import React from "react";
import { useParams } from "react-router";
import { ItemDetailContainer } from "../components";
import { useProductById } from "../hooks";
import { Flex, Spinner } from "@chakra-ui/react";

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
    <ItemDetailContainer product={productData}/>
  );
};