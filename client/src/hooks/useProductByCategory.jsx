import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const useProductsByCategory = (id) => {
  
  const [productsData, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customQuery = query(  // query significa "consulta" a firebase a travez del where y el "==", es el operador de comparacion.//
      collection(db, "products"), 
      where("category", "==", id)
    );

    getDocs(customQuery)
      .then((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return { productsData, loading };
};