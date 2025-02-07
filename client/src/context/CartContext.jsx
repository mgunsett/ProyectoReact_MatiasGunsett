import { createContext, useState } from "react";

//!------Resumen 👇 ------------------------------
// CartContext: Es el contexto global que compartes.
// CartProvider: Es el proveedor que envuelve los componentes que necesitan acceder al carrito.
// addItem: Es la lógica que administra la adición de productos al carrito, actualizando el estado global.
//! -------------------------------------------------------------------------------------------------------
export const CartContext = createContext(); //Creamos el contexto 

//Siempre va el prefijo "Provider"(proovedor) ya que proporcionará datos mediante el contexto.
export const CartProvider = ({ children }) => {

  const [cartState, setCartState] = useState([]);

  const addItem = (product, qtyItem) => {
    const existingProduct = cartState.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualizamos la cantidad, sumando solo la diferencia
      setCartState(
        cartState.map((item) =>
          item.id === product.id
            ? { ...item, qtyItem: item.qtyItem + 1 } // Aquí solo sumamos 1 a la cantidad existente
            : item
        )
      );
    } else {  
      // Si el producto no está en el carrito, lo agregamos
      setCartState([...cartState, { ...product, qtyItem }]);
    }
  };

  const removeItem = (product) => {
    const existingProduct = cartState.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si la cantidad es 1, eliminamos el producto del carrito
      if (existingProduct.qtyItem === 1) {
        setCartState(cartState.filter((item) => item.id !== product.id));
      } else {
        // Si la cantidad es mayor a 1, restamos 1 a la cantidad existente
        setCartState(
          cartState.map((item) =>
            item.id === product.id
              ? { ...item, qtyItem: item.qtyItem - 1 }
              : item
          )
        );
      }
    }
  };
  //Borrar product de carrito detalle:
  const deleteItem = (product) => {
    setCartState(cartState.filter((item) => item.id !== product.id));
  };

//Context Hell: es un término que se utiliza para describir la situación en la qzue un componente necesita acceder a muchos contextos diferentes.
  return (
    <CartContext.Provider value={{ cartState, addItem, removeItem, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};