import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useItemsCollection = (categoryName) => {
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const itemsCollection = collection(db, categoryName);//Aca definimos como parametro "DB, la coleccion (a la q queremos ingresar)"//
    getDocs(itemsCollection)
      .then((snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//Usamos '(snapshot)' & "snapshot.docs.map" para recorrer la coleccion y devolver un array de objetos con 
//la info de cada documento, ya que viene encriptada.
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [categoryName]);

  return { items, loading, error };
};


  //!Customizamos el hook por "ItemsCollection" para que sea mas abarcativo respecto a las colecciones q tengamos en Firebase
  //!  y podemos reutilzarlo para cualquier caso, solo cambiando el parametro que recibe.//