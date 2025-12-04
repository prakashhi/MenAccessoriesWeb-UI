import React from "react";

import HeaderImg from "@/public/Images/Styling-Jewellery-for-Men-4-key-rules-men-should-follow-4.webp";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="relative top-10">
        <div className="flex flex-col lg:gap-2 gap-1 justify-center text-center lg:pb-10 mb-8">
          <h1
            style={{ fontFamily:"ui-sans-serif", fontWeight: 600 }}
            id="HeaderText"
            className="font-bold lg:text-3xl sm:text-2xl text-[15px]"
          >
            Define Your Signature Look
          </h1>
          <p className="lg:text-medium text-[13px]" style={{ fontFamily:"serif", fontWeight: 500 }}>Essential accessories that elevate your everyday style effortlessly</p>
        </div>

        <div className="lg:m-5 m-2 flex flex-row  shadow-xl bg-ThemCharcoal ">
          <Image
            className="lg:w-[80%] w-[60%]  shadow hover:scale-105 transition duration-500 ease-linear cursor-pointer"
            loading="eager"
            src={HeaderImg}
            alt="Header"
            width={400}
            height={500}
          />
          <div className="flex flex-col w-full justify-center text-center items-center">
            <div className="flex flex-col text-center justify-center gap-3">
              <span className="font-bold cursor-pointer  hover:text-gray-600  text-white transition duration-700 ease-in-out  lg:text-4xl sm:text-2xl text-center text-[12px]">
                Let's Feel It
              </span>
              <p className=" lg:text-xl cursor-pointer text-gray-50 sm:text-medium text-[7px]">
                Explore the New Collection of Timeless Fashion.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
