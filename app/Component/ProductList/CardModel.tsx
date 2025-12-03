"use client";
import { UsePanel } from "@/context/SerchPanelContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FcLikePlaceholder } from "react-icons/fc";
import Star from "./Star";

import { product } from "@/context/Types/type";

export default function CardModel({ DataObj }: { DataObj: product[] }) {
  const { AddCartProduct } = UsePanel();

  return (
    <>
      {DataObj &&
        DataObj.map((value: any, index: number) => (
          <div
            className=" hover:lg:my-1 hover:my-[10pxx] hover:mx-1 hover:shadow-xl transition duration-500 ease-in-out  sm:w-56 md:w-64 lg:w-84 w-54 h-72  shrink-0  sm:h-64 md:h-[500px] lg:m-3  flex flex-col lg:gap-3 cursor-pointer m-1 shadow mt-10"
            key={index}
          >
            <div className="flex-1 relative  ">
              <Image
                className="object-cover "
                src={value?.img}
                alt={`${value.name}`}
                sizes="100"
                loading="eager"
                fill
                // width={300}
                // height={300}
              />
              <div title="Add to Wishlist"  className="relative z-1 bg-ThemGold  rounded-full w-6 h-6 flex justify-center border border-[#1a1a1a] shadow left-[87%] top-3 items-center ">
                <FcLikePlaceholder className="" />
              </div>
            </div>

            <div className="flex flex-col items-center  gap-1 p-3">
              <span
                style={{ fontFamily: "sans-serif", fontWeight: 700 }}
                className="font-semibold text-center lg:text-medium sm:text-2xl text-[10px]"
              >
                {value.name}
              </span>

              <Star starNum={2.5} />

              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
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
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                }}
                className="lg:text-medium sm:text-[10px] bg-HoverThemDeepGray  text-[9px] border border-black hover:border-none hover:text-white transition duration-700 ease-in-out  w-full p-2"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        ))}
    </>
  );
}
