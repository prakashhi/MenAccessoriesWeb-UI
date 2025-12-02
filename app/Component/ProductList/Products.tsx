"use client";

import { Button } from "@heroui/react";
import { ProductData } from "./ProductData";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import ReactStars from "react-stars";

import { UsePanel } from "@/context/SerchPanelContext";

export default function Product() {
  const { AddCartProduct } = UsePanel();

  return (
    <>
      <div className="lg:mt-32 mt-20 bg-lightCyan">
        {ProductData.map((val, index) => (
          <div key={index}>
            <div className="flex flex-col lg:gap-15 gap-3  items-center justify-center  cursor-pointer">
              {" "}
              <div className="flex lg:gap-3 gap-2 items-center justify-center flex-col lg:mt-10 mt-20">
                <span
                  style={{ fontFamily: "system-ui", fontWeight: 500 }}
                  className="font-bold lg:text-xl sm:text-medium text-[20px]"
                >
                  {val.category}
                </span>
                <Link
                  href={`/Category/${val.category}`}
                  className="lg:text-medium text-[13px]  px-6 py-2  border border-black bg-white hover:bg-black hover:text-white duration-700 ease-in-out "
                >
                  VIEW ALL
                </Link>
              </div>
              <div className="flex flex-row overflow-auto scrollbar-hide lg:mx-2 px-2 lg:gap-1   w-full">
                {val.products.map((value, i) => (
                  <div
                    className=" sm:w-56 md:w-64 lg:w-64 w-54 h-72  shrink-0  sm:h-64 md:h-[500px] lg:m-3   flex flex-col lg:gap-3 cursor-pointer m-1 shadow mt-10"
                    key={i}
                  >
                    <div className="flex-1 relative  ">
                      <Image
                        className="object-cover  hover:p-1 transition duration-700 ease-in-out"
                        src={value?.img}
                        alt={`${i}`}
                        sizes="100"
                        loading="eager"
                        fill
                        // width={300}
                        // height={300}
                      />
                    </div>

                    <div className="flex flex-col items-center  gap-1 p-3">
                      <span
                        style={{ fontFamily: "sans-serif", fontWeight: 100 }}
                        className="font-semibold text-center lg:text-medium sm:text-2xl text-[10px]"
                      >
                        {value.name}
                      </span>
                      <ReactStars size={10} count={5}  color2={"3F00FF"} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 100,
                        }}
                        className="text-center lg:text-medium sm:text[15px] text-[10px]"
                      >
                        Rs {value.price}.00
                      </span>
                    </div>
                    <div className=" justify-center  p-3 ">
                      <Button
                        type="button"
                        onPress={() => {
                          AddCartProduct(value);
                          toast.success("Product is addes to Cart", {
                            duration: 4000,
                            position: "top-center",
                          });
                        }}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                        }}
                        className="lg:text-medium sm:text-[10px] bg-themeColorHover  text-[9px] border border-black hover:border-none hover:text-white transition duration-700 ease-in-out  w-full p-2"
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
