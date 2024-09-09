import { useState, useEffect } from "react";
import { getProductByCategorys } from "../service/products.service";

export const useProductByCategory = (id) => {
  
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductByCategorys(id)
      .then((res) => {
        setProductsData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { productsData, loading };
}