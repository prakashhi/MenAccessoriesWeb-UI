"use client";

import Nav from "./Component/NavBar/Nav";
import Header from "./Component/Header/Header";
import Product from "../app/Component/ProductList/Products";
import Footer from "../app/Component/Footer/Footer";
import MobileNavBar from "./Component/NavBar/MobileNavBar";

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <Product />
      <Footer />
      <MobileNavBar />
    </>
  );
}
