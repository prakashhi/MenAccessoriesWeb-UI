"use client";
import React from "react";
import { Category } from "../Component/Categotys";
import { MdKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import { ProductData } from "../Component/ProductList/ProductData";
import Image from "next/image";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";

export default function page() {
  const { AddCartProduct } = UsePanel();
  return (
    <React.Fragment>
      <div className="my-1">
        <div className="p-3 lg:p-6 md:p-6 sm:p-3  flex  flex-col gap-10 ">
          <Link
            href={"/"}
            className="flex flex-row cursor-pointer items-center gap-2 hover:underline"
          >
            {" "}
            <MdKeyboardBackspace />
            <span>Back</span>
          </Link>
          <div className="flex flex-row">
            <input
              className="w-full outline-hidden outline-0  p-3 bg-white/80 border border-black"
              name="username"
              placeholder="Search "
            />
          </div>

          <div className="grid gap-3 grid-cols-3 lg:grid-cols-5 sm:grid-cols-4">
            {Category.map((val, index) => (
              <Link
                href={`/Category/${val.name}`}
                className=" text-center border  border-gray-600 bg-themeColorHover rounded-md hover:text-white hover:border-none p-2  cursor-pointer "
                key={index}
              >
                {val.name}
              </Link>
            ))}
          </div>

          <div>
            <span>Suggested Products</span>

            <div className="flex flex-row overflow-auto scrollbar-hide  lg:gap-1   w-full">
              {ProductData[0]?.products.map((val, index) => (
                <div
                  key={index}
                  className=" sm:w-56 md:w-64 lg:w-64 w-54 h-72  shrink-0  sm:h-64 md:h-[500px] lg:m-3   flex flex-col lg:gap-3 cursor-pointer m-1 shadow mt-10 "
                >
                  <div className="flex-1 relative">
                    <Image
                      className="object-cover hover:p-1 w-full transition duration-700 ease-in-out"
                      src={val?.img}
                      alt={`${index}`}
                      loading="eager"
                      fill
                      sizes="100"
                      // width={300}
                      // height={300}
                    />
                  </div>

                  <div className="flex flex-col   gap-3 p-3">
                    <span
                      style={{ fontFamily: "sans-serif", fontWeight: 100 }}
                      className="font-semibold text-center xs:text-[10px]"
                    >
                      {val.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 100,
                      }}
                      className="text-center"
                    >
                      Rs {val.price}.00
                    </span>
                  </div>
                  <div className=" justify-center  p-3 ">
                    <Button
                      onPress={() => AddCartProduct(val)}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 300,
                      }}
                      className=" border border-black hover:border-none hover:text-white transition duration-700 ease-in-out bg-themeColorHover w-full p-2"
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
