"use client";
import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import { UsePanel } from "@/context/SerchPanelContext";

import Image from "next/image";
import Link from "next/link";
import ItemCount from "../Cart/component/ItemCount";
import { Button } from "@heroui/react";

export default function Page() {
  const { likeProduct, AddCartProduct, RemoveLikeProdcut } = UsePanel();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Nav />

      <div className="flex-1 py-10 px-4 md:px-8 lg:px-16">
        <h1 className="text-center text-2xl lg:text-4xl font-extrabold mb-10 underline tracking-wide">
          Wishlist
        </h1>

        {likeProduct.length > 0 ? (
          <div className="grid gap-6 lg:gap-8">
            {likeProduct.map((item: any, i: number) => (
              <div
                key={i}
                className="grid lg:grid-cols-3 grid-cols-1 gap-4 items-center border-b border-gray-300 pb-6 hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 bg-white"
              >
                {/* Product Image & Info */}
                <div className="flex flex-row lg:gap-6 gap-4 items-center">
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                      loading="eager"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-lg lg:text-xl">
                      {item.name}
                    </span>

                    <ItemCount Quanty={item.Quanty} id={item.id} type="LikeProduct" />

                    <Button
                      onPress={() => RemoveLikeProdcut(item.id)}
                      className="bg-black text-white hover:bg-gray-800 rounded-lg w-32 px-3 py-2 font-medium"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex justify-center lg:justify-start items-center font-bold text-lg lg:text-xl">
                  Rs {item.price}.00
                </div>

                {/* Add to Cart Button */}
                <div className="flex justify-center lg:justify-end items-center">
                  <Button
                    onPress={() => {
                      AddCartProduct(item, "LikeProduct");
                      RemoveLikeProdcut(item.id);
                    }}
                    className="bg-white text-black border-black font-bold hover:bg-gray-800 hover:text-white rounded-lg px-4 py-3 w-full lg:w-48 transition-all duration-300"
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center mt-20 gap-4">
            <span className="text-2xl lg:text-3xl font-bold">
              Your Wishlist is Empty
            </span>
            <Link
              href="/"
              className="bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-300"
            >
              Back To Home
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
