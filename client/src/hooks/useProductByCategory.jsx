import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const useProductsByCategory = (id) => {
  
  const [productsData, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset de estados cuando cambia el id (categoría)
    setLoading(true);
    setError(null);
    setProducts([]);

    // Si no hay id válido, evitamos consultar y finalizamos la carga
    if (!id) {
      setLoading(false);
      return;
    }

    const customQuery = query(  
      collection(db, "products"),
      where("categories", "array-contains", id)
    );

    getDocs(customQuery)
      .then((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [id]);

  return { productsData, loading, error };
};