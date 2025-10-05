import { Box } from "@chakra-ui/react";
import { AprobedPay } from "../components";
import './Styles/PostPayment.css';
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context";

export const PostPayment = () => {
  const location = useLocation();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const status = (params.get('status') || params.get('collection_status') || '').toLowerCase();

      // Evitar limpiar el carrito más de una vez por sesión en esta página
      const alreadyCleared = sessionStorage.getItem('cart_cleared');

      if (status === 'approved' && !alreadyCleared) {
        clearCart();
        sessionStorage.setItem('cart_cleared', '1');
      }
    } catch (e) {
      // No bloquear la vista por un error al leer params
      console.warn('PostPayment: no se pudo procesar el estado de pago', e);
    }
  }, [location.search, clearCart]);

  return (
    <Box
      paddingTop={16}
      backgroundColor={'white'}
    >
      <Box
        overflow="auto"
      >
        <AprobedPay />
      </Box>
    </Box>
  )
}