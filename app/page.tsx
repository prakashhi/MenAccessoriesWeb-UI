"use client";
import React from "react";
import Nav from "./Component/NavBar/Nav";
import Header from "./Component/Header/Header";
import Product from "../app/Component/ProductList/Products";
import Footer from "../app/Component/Footer/Footer";

export default function Home() {
  return (
    <React.Fragment>
      <Nav />
      <Header />
      <Product />
      <Footer />
    </React.Fragment>
  );
}
