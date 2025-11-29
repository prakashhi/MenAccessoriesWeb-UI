"use client";

import { Button } from "@heroui/react";
import { ProductData } from "./ProductData";
import Image from "next/image";

export default function Product() {
  return (
    <>
      <div className="mt-32">
        {ProductData.map((val, index) => (
          <div key={index}>
            <div className="flex flex-col items-center justify-center mt-10 cursor-pointer">
              {" "}
              <div className="flex  items-center flex-col gap-3">
                <span className="font-bold text-xl">{val.category}</span>
                <Button className="  px-6 py-2 rounded-md border-black bg-white hover:bg-gray-200 duration-700 ease-in-out shadow">
                  More
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-3 ">
                {val.products.map((value, i) => (
                  <div className="grid grid-row  shadow m-3 mt-10" key={i}>
                    <Image
                      src={value?.img}
                      alt={`${i}`}
                      width={300}
                      height={300}
                    />
                    <div className="flex flex-col  gap-3 p-3">
                      <span className="font-semibold text-center">{value.name}</span>
                      <span className="text-center">Rs {value.price}.00</span>
                    </div>
                    <div className=" justify-center p-3 hover:block hidden">
                      <Button className="bg-blue-400 w-full p-2">ADD TO CART</Button>
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
