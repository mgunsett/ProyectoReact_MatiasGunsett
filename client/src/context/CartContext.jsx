import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(); //Creamos el contexto 

//Siempre va el prefijo "Provider"(proovedor) ya que proporcionará datos mediante el contexto.
export const CartProvider = ({ children }) => {

  const [cartState, setCartState] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('No se pudo leer el carrito desde localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (e) {
      console.warn('No se pudo guardar el carrito en localStorage', e);
    }
  }, [cartState]);

  const addItem = (product, qtyItem) => {
    // product debe incluir selectedSize cuando aplique
    const existingProduct = cartState.find(
      (item) => item.id === product.id && item.selectedSize === product.selectedSize
    );

    // Resolver stock por talle (p.ej. SM, MD, LA, XL, 2XL) o fallback a product.stock
    const sizeKey = product?.selectedSize?.toUpperCase?.();
    const sizeStock = (sizeKey && product?.[sizeKey] != null) ? Number(product[sizeKey]) : (product?.stock != null ? Number(product.stock) : Infinity);

    if (existingProduct) {
      // Si se proporciona qtyItem, se interpreta como cantidad deseada exacta; si no, incrementa +1
      const desiredQty = qtyItem != null ? Number(qtyItem) : existingProduct.qtyItem + 1;
      const finalQty = Math.min(desiredQty, sizeStock);
      if (finalQty <= 0) return; // no aplicar cantidades inválidas

      setCartState(
        cartState.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, qtyItem: finalQty }
            : item
        )
      );
    } else {  
      const initialQty = Math.max(1, qtyItem != null ? Number(qtyItem) : 1);
      const finalQty = Math.min(initialQty, sizeStock);
      if (finalQty <= 0) return; // sin stock, no agregar
      setCartState([...cartState, { ...product, qtyItem: finalQty }]);
    }
  };

  const removeItem = (product) => {
    const existingProduct = cartState.find(
      (item) => item.id === product.id && item.selectedSize === product.selectedSize
    );
    if (!existingProduct) return;

    if (existingProduct.qtyItem <= 1) {
      setCartState(
        cartState.filter(
          (item) => !(item.id === product.id && item.selectedSize === product.selectedSize)
        )
      );
      } else {
        setCartState(
          cartState.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
              ? { ...item, qtyItem: item.qtyItem - 1 }
              : item
          )
        );
      }
  };
  //Borrar product de carrito detalle:
  const deleteItem = (product) => {
    setCartState(
      cartState.filter(
        (item) => !(item.id === product.id && item.selectedSize === product.selectedSize)
      )
    );
  };

  // Vaciar completamente el carrito (también limpia localStorage por el efecto de sincronización)
  const clearCart = () => {
    try {
      setCartState([]);
      // Opcional: remover la key para dejar el storage "limpio"
      localStorage.removeItem('cart');
    } catch (e) {
      console.warn('No se pudo limpiar el carrito', e);
    }
  };

//Context Hell: es un término que se utiliza para describir la situación en la qzue un componente necesita acceder a muchos contextos diferentes.
  return (
    <CartContext.Provider value={{ cartState, addItem, removeItem, deleteItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

//! Info --------------------------------------------------------------------------------------------------
// CartContext: Es el contexto global que compartes.
// CartProvider: Es el proveedor que envuelve los componentes que necesitan acceder al carrito.
// addItem: Es la lógica que administra la adición de productos al carrito, actualizando el estado global.
//! -------------------------------------------------------------------------------------------------------