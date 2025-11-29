import React from "react";

import HeaderImg from "@/public/Images/Styling-Jewellery-for-Men-4-key-rules-men-should-follow-4.webp";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header>
        <div className="flex justify-center text-center py-8 mb-8">
          <span id="HeaderText" className="font-bold text-3xl">
            Essential Accessories for the Modern Man.
          </span>
        </div>

        <div className="m-5 flex flex-row shadow-2xl">
          <Image className="w-1/2 shadow" src={HeaderImg} alt="Header" width={400} height={500} />
          <div className="flex flex-col w-full justify-center text-center items-center">
            <div className="flex flex-col text-center justify-center gap-3">
              <span className="font-bold text-4xl text-center">
                Let's Feel It
              </span>
              <p className=" text-xl">
              Explore the New Collection of Timeless Fashion.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
