"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { UsePanel } from "@/context/SerchPanelContext";
import Link from "next/link";

export default function Nav() {
  const { cartProduct } = UsePanel();
  return (
    <React.Fragment>
      <nav className="bg-black p-2 py-5 w-full  sticky  top-0 z-10">
        <div className="flex flex-row items-center justify-between mx-3">
          <div className="rounded-md ">
            <Link href={"/SearchBar"}>
              <CiSearch
                // onClick={hadleOpenSearch}
                className="text-white cursor-pointer rounded-md hover:bg-white transition duration-700 ease-in-out hover:text-black"
                size={25}
              />
            </Link>
          </div>

          <div>
            <Link href={'/'} id="LogoText" className="text-white text-xl cursor-pointer">
              9RockeRoars
            </Link>
          </div>

          <div className="flex flex-row gap-5">
            <FcLike
              size={23}
              className="bg-black  cursor-pointer rounded-md "
            />
            <FaUser
              size={23}
              className="cursor-pointer rounded-md "
              color="white"
            />
            <Link className="relative" href={"/Cart"}>
              {cartProduct.length > 0 && (
                <div className="w-3.5  h-3.5 flex items-center rounded-full p-1 absolute bottom-3.5 text-[10px]  left-4 bg-white">
                  <span    style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
              }} className="text-center ">{cartProduct.length}</span>{" "}
                </div>
              )}

              <FaShoppingCart
                size={23}
                className="cursor-pointer  rounded-md  text-white"
              />
            </Link>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
