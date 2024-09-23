import { ItemsListContainer } from "../components";
import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../hooks";
import { SkeletonLoading } from "../components/SkeletonLoading";

export const Category = () => {

  const { id } = useParams();
  const { productsData  , loading } = useProductsByCategory(id);

  return loading ? (
    <SkeletonLoading />
  ) : (
    <ItemsListContainer title={id}  products={productsData}/>
  );
};