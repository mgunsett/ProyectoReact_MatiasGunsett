import { Flex, Spinner } from '@chakra-ui/react'
import { ItemsListContainer } from "../components";
import { useParams } from "react-router-dom";
import { useProductByCategory } from "../hooks";


export const Category = () => {

  const { categoryId } = useParams();
  const { productsData, loading } = useProductByCategory(categoryId);

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
    <ItemsListContainer title={'Be Real'} products={productsData}/>
  );
};