import React from "react";
import HeaderImg from "@/public/Images/Styling-Jewellery-for-Men-4-key-rules-men-should-follow-4.webp";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative pt-6 sm:pt-10">
      {/* Top Title */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
        <h1
          style={{ fontFamily: "ui-serif", fontWeight: 900 }}
          className="text-[22px] sm:text-3xl md:text-4xl tracking-tight font-bold"
        >
          Define Your Signature Look
        </h1>
        <div className="w-12 sm:w-16 h-[2px] bg-black mt-2 opacity-60"></div>
      </div>

      {/* Image + Info Box */}
      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 flex flex-col lg:flex-row shadow-lg rounded-xl overflow-hidden bg-white">
        
        {/* Image */}
        <div className="w-full lg:w-[70%]">
          <Image
            className="w-full h-auto object-cover hover:scale-105 transition-all duration-500 ease-out"
            src={HeaderImg}
            alt="Header"
            priority
          />
        </div>

        {/* Right Text Box (visible on large screen only) */}
        <div className="hidden lg:flex w-full bg-[#F6F6F6] items-center justify-center text-center px-10">
          <div className="flex flex-col gap-4">
            <span className="font-bold hover:text-gray-700 transition text-3xl">
              Let’s Feel It
            </span>
            <p className="text-lg text-gray-700">
              Explore the New Collection of Timeless Fashion.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Text Box (beautiful stacked look) */}
      <div className="lg:hidden flex flex-col items-center mt-4 px-3 text-center">
        <h2 className="text-xl font-semibold tracking-wide">
          Let’s Feel It
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Explore the New Collection of Timeless Fashion.
        </p>
      </div>
    </header>
  );
}
