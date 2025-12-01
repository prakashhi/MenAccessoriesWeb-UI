"use client";

import { Button } from "@heroui/react";
import { ProductData } from "./ProductData";
import Image from "next/image";

export default function Product() {
  return (
    <>
      <div className="lg:mt-32">
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
                <Button className="  px-6 py-2  border border-black bg-white hover:bg-black hover:text-white duration-700 ease-in-out ">
                  VIEW ALL
                </Button>
              </div>
              <div className="flex flex-row overflow-auto  lg:gap-1   w-full">
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
                        fill
                        // width={300}
                        // height={300}
                      />
                    </div>

                    <div className="flex flex-col   gap-3 p-3">
                      <span
                        style={{ fontFamily: "sans-serif", fontWeight: 100 }}
                        className="font-semibold text-center lg:text-medium sm:text-2xl text-[10px]"
                      >
                        {value.name}
                      </span>
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
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                        }}
                        className="lg:text-medium sm:text-[10px] text-[5px] border border-black hover:border-none hover:text-white transition duration-700 ease-in-out hover:bg-blue-600 w-full p-2"
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
