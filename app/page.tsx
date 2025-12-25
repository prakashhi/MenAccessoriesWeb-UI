"use client";

import Nav from "@/app/(User)/Component/NavBar/Nav";

import Header from "@/app/(User)/Component/Header/Header";
import Product from "./(User)/Component/ProductList/Products";
import Footer from "./(User)/Component/Footer/Footer";


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
