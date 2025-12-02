import React from "react";

import HeaderImg from "@/public/Images/Styling-Jewellery-for-Men-4-key-rules-men-should-follow-4.webp";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header>
        <div className="flex justify-center text-center py-8 mb-8">
          <span style={{ fontFamily: "sans-serif", fontWeight: 600, }} id="HeaderText" className="font-bold lg:text-3xl sm:text-2xl text-[15px]">
            Essential Accessories for the Modern Man.
          </span>
        </div>

        <div className="lg:m-5 m-2 flex flex-row  shadow-xl">
          <Image className="lg:w-[80%] w-[60%]  shadow"   loading="eager" src={HeaderImg} alt="Header" width={400} height={500} />
          <div className="flex flex-col w-full justify-center text-center items-center">
            <div className="flex flex-col text-center justify-center gap-3">
              <span className="font-bold cursor-pointer  hover:text-gray-700 transition duration-700 ease-in-out  lg:text-4xl sm:text-2xl text-center text-[12px]">
                Let's Feel It
              </span>
              <p className=" lg:text-xl cursor-pointer sm:text-medium text-[7px]">
              Explore the New Collection of Timeless Fashion.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
