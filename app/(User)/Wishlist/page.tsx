"use client";

import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import { UsePanel } from "@/context/SerchPanelContext";
import Image from "next/image";
import Link from "next/link";
import ItemCount from "../Cart/component/ItemCount";
import { Button, Card, CardBody } from "@heroui/react";

export default function Page() {
  const { likeProduct, AddCartProduct, RemoveLikeProdcut } = UsePanel();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8] text-[#111]">
      <Nav />

      <div className="flex-1 py-12 px-4 md:px-10 lg:px-28">
        <h1 className="text-center text-3xl lg:text-4xl font-semibold mb-12 tracking-widest">
          WISHLIST
        </h1>

        {likeProduct.length > 0 ? (
          <div className="grid gap-8">
            {likeProduct.map((item: any, i: number) => (
              <Card
                key={i}
                className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardBody className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center lg:p-5 p-6">
                  
                  {/* Image + Info */}
                  <div className="flex flex-row items-center gap-6">
                    <div className="relative w-28 h-28 lg:w-36 lg:h-36 shrink-0">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-items-center gap-4">
                      <span style={{
                        fontWeight:700
                      }} className="text-xl lg:text-xl font-medium tracking-wide">
                        {item.name}
                      </span>

                      <ItemCount
                        Quanty={item.Quanty}
                        id={item.id}
                        type="LikeProduct"
                      />

                      <Button
                        onPress={() => RemoveLikeProdcut(item.id)}
                        className="bg-transparent  lg:w-1/2    font-medium tracking-wide  transition-all duration-300"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-center lg:justify-start items-center">
                    <span className="text-2xl font-semibold tracking-wide">
                      ₹{item.price}.00
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex justify-center lg:justify-end items-center">
                    <Button
                      onPress={() => {
                        AddCartProduct(item, "LikeProduct");
                        RemoveLikeProdcut(item.id);
                      }}
                      className="bg-[#111] text-white font-medium rounded-xl px-6 py-3 w-full lg:w-48 tracking-wide hover:bg-[#222] transition-all duration-300"
                    >
                      ADD TO CART
                    </Button>
                  </div>

                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col justify-center items-center text-center mt-28 gap-6">


            <h2 className="text-medium lg:text-xl font-semibold tracking-wide text-[#444]">
              Your Wishlist is Empty
            </h2>

            <Link
              href="/"
              className="bg-[#111] text-white font-medium py-3 px-8 rounded-xl tracking-wide hover:bg-[#222] transition-all duration-300"
            >
              BACK TO HOME
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
