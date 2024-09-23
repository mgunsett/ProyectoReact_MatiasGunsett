import { db } from "../firebase";
import { collection, addDoc } from "../firebase";

export async function addProductsLocalStorage(collectionName) {
  try {
    // 1. Obtener la lista de productos desde localStorage
    const fetchedProducts = JSON.parse(localStorage.getItem("products"));

    // Verificar si hay productos almacenados
    if (!fetchedProducts || fetchedProducts.length === 0) {
      throw new Error("No hay productos en localStorage.");
    }

    // 2. Referencia a la colección en Firestore
    const productsCollection = collection(db, collectionName);

    // 3. Añadir los productos a Firestore
    const addPromises = fetchedProducts.map(async (product) => {
      return await addDoc(productsCollection, {
        ...product,
        createdAt: new Date(),
      });
    });

    await Promise.all(addPromises);
    console.log(`${fetchedProducts.length} productos añadidos a Firestore.`);
  } catch (err) {
    console.error("Error al agregar productos desde localStorage:", err);
  }
}

// import { getAllProducts } from "../service/products.service";

// import { db } from "./../firebase";
// import { collection, addDoc } from "firebase/firestore";

// export async function createProductsFirestore(collectionName) {
//   try {
//     // 1. Obtener los productos de la API
//     const response = await getAllProducts();
//     const fetchedProducts = response.data.products;

//     // Verificar que la respuesta sea un array //
//     if (!Array.isArray(fetchedProducts)) {
//       throw new Error("La respuesta de la API no es un array.");
//     } // En caso de que no lo sea, se lanza un error //

//     // 2. Referencia a la colección en Firestore
//     const productsCollection = collection(db, collectionName);

//     // 3. Añadir los nuevos productos a Firestore
//     const addPromises = fetchedProducts.map((product) => {
//       delete product.id; //Elimina el ID que proviene de la API
//       return addDoc(productsCollection, {
//         ...product,
//         createdAt: new Date(),
//       });
//     });

//     await Promise.all(addPromises);

//     console.log(`${fetchedProducts.length} productos añadidos a Firestore.`);
//   } catch (err) {
//     console.error("Error al obtener o almacenar productos:", err);
//   }
// }
