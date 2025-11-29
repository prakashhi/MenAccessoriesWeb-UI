"use client";
import Image from "next/image";
import React from "react";
import Nav from "./Component/NavBar/Nav";
import Header from "./Component/Header/Header";
import { UsePanel } from "@/context/SerchPanelContext";
// import SearchPanel from "./Component/SerchPanel/SearchPanel";
import Product from '../app/Component/ProductList/Products'

export default function Home() {
  const { state } = UsePanel();
  console.log(state);
  return (
    <React.Fragment>
      {/* {state.isSearchPanel == true && <SearchPanel />} */}

      <Nav />
      <Header />
      <Product/>
    </React.Fragment>
  );
}
