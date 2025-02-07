import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useProductById = (id) => {
  
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const productItem = doc(db, "products", id);//Aca definimos como parametros "DB, la coleccion y el ID", ya q es un solo producto//
    console.log(productItem)
    getDoc(productItem)
      .then((snapshot) => {
        setProductData({ id: snapshot.id, ...snapshot.data() });
        //si, usamos (snapshot) pero ya no el .map para recorrer el objeto snapshot.data()//
        //ya que ahora solo vamos a traer un solo producto segun el "id"  //
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { productData, loading };
};  