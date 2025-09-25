import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Este componente fuerza el scroll al tope cada vez que cambia la ruta
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Opcional: desactivar restauración automática del navegador
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {}
    }

    // Forzar scroll al tope de la página en cada cambio de ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
