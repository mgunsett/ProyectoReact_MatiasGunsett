import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Home, Events, Item, Memo, Checkout } from "../pages";
import { Navbar } from "../components";

export const MainRouter = () => {

  //Parametro de URL: es un dato dinamico que se puede pasar a una ruta
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/memo" element={<Memo />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/events" element={<Events label="Events" />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
        //!--- Otra forma de declarar un Evento 👇
        {/* <Route path="/events" element={<Events handleClick={() => alert('Click')} />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

//rafc iniciará un componente funcional con arrow function y export
// rafce iniciará un componente funcional con arrow function y export default