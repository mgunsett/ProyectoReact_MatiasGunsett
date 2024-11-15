import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Home, Item, Checkout, Contacto, Payment } from "../pages";
import { Navbar, Footer } from "../components";


export const MainRouter = () => {

  //Parametro de URL: es un dato dinamico que se puede pasar a una ruta
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

//rafc iniciará un componente funcional con arrow function y export
// rafce iniciará un componente funcional con arrow function y export default

{/* // <Route path="/memo" element={<Memo />}/> */}
{/* // <Route path="/events" element={<Events label="Events" />} /> */}

  //!--- Otra forma de declarar un Evento 👇
{/* <Route path="/events" element={<Events handleClick={() => alert('Click')} />} /> */}