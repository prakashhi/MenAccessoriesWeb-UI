"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { UsePanel } from "@/context/SerchPanelContext";


export default function Nav() {
 
    const {setState} = UsePanel()
     

  const hadleOpenSearch = () => {
    setState((prev) => ({ ...prev, isSearchPanel: true }));
  };



  return (
    <React.Fragment>
      <nav className="bg-black p-2 py-3 ">
        <div className="flex flex-row items-center justify-between mx-3">
          <div className="rounded-md ">
            <CiSearch
              onClick={hadleOpenSearch}
              className="text-white cursor-pointer rounded-md hover:bg-white transition duration-700 ease-in-out hover:text-black"
              size={25}
            />
          </div>

          <div>
            <span id="LogoText" className="text-white text-xl cursor-pointer">
              9RockeRoars
            </span>
          </div>

          <div className="flex flex-row gap-5">
            <FcLike className="bg-black  cursor-pointer rounded-md " />
            <FaUser className="cursor-pointer rounded-md " color="white" />
            <FaShoppingCart className="cursor-pointer  rounded-md  text-white" />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
