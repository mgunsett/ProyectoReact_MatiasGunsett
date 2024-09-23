import React from "react";
import { ItemsListContainer } from "../components";
import { useItemsCollection } from "../hooks";
import { Flex, Spinner, Box } from "@chakra-ui/react";

export const Home = () => {

  const { items, loading, error } = useItemsCollection("products"); 
  //y aca le pasamos como parametro a la hooks que customizamos el nombre de la "Coleccion" //

  return loading ? (
    <Flex justifyContent={"center"} alignItems={"center"} h={"90vh"}>
      <Spinner />
    </Flex>
  ) : error ? (
    <Box>
      Hay un error durante la carga de los productos, por favor contactese con
      soporte.
    </Box>
  ) : (
    <ItemsListContainer title={"Be🛸Real"} products={items} />
  );
};