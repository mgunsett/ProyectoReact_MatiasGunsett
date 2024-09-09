import { useEffect, useState } from "react";
import { getCategories } from "../service/products.service";

export const useCategory = () => {
  
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { category };
};