import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Home, Item, Checkout, Contacto, Payment, PostPayment } from "../pages";
import { Navbar, Footer } from "../components";
import { ScrollToTop } from "./ScrollToTop";


export const MainRouter = () => {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/postpayment" element={<PostPayment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
