"use client";

import Nav from "@/Component/NavBar/Nav";

import Header from "@/Component/Header/Header";
import Product from "@/Component/ProductList/Products";
import Footer from "@/Component/Footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <Product />
      <Footer />
    </>
  );
}
