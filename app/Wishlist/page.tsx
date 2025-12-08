"use client";
import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import { UsePanel } from "@/context/SerchPanelContext";

import Image from "next/image";
import Link from "next/link";
import ItemCount from "../Cart/component/ItemCount";
import { Button } from "@heroui/react";

export default function page() {
  const { likeProduct, AddCartProduct, RemoveLikeProdcut } = UsePanel();
  const Qty = 1;
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />

        <div className="my-5 flex-1">
          <div className="">
            <div className="flex flex-col  items-center gap-5 lg:gap-10">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                }}
                className="lg:text-2xl mt-10 lg:mb-0 mb-5 underline"
              >
                Wishlist
              </span>

              <div className="flex lg:flex-row lg:px-10 flex-col px-3 w-full gap-5  mx-3">
                <div className="grid  lg:gap-5 gap-3 max-h-[400px] overflow-auto w-full  ">
                  {likeProduct.length > 0 ? (
                    likeProduct.map((val: any, i: number) => (
                      <div
                        key={i}
                        className="grid lg:grid-cols-3 grid-cols-2  lg:gap-0 gap-5 justify-items-center items-center border-gray-100 border-b-1 pb-5     "
                      >
                        <div className="flex flex-row lg:gap-5  gap-3 items-center">
                          <Image
                            className=" cursor-pointer hover:scale-105 transition duration-500 ease-in"
                            loading="eager"
                            src={val?.img}
                            width={100}
                            height={100}
                            alt={`${i}`}
                          />

                          <div className="flex flex-col gap-1 items-baseline">
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                              }}
                              className="lg:text-medium text-[13px]"
                            >
                              {val.name}
                            </span>

                            <ItemCount Quanty={val.Quanty} id={val.id} type="LikeProduct" />
                            <Button
                              onPress={() => RemoveLikeProdcut(val.id)}
                              className="border border-gray-300  rounded-sm"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="justify-self-end">
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            Rs {val.price}.00
                          </span>
                        </div>

                        <div className="lg:col-auto lg:w-auto sm:w-auto w-full  col-span-2">
                          <Button
                            onPress={() => {
                              AddCartProduct(val,"LikeProduct");
                              RemoveLikeProdcut(val.id);
                            }}
                            className="bg-ThemGold font-bold  w-full rounded-sm px-3 py-2"
                          >
                            ADD TO CART
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center text-center gap-3 mt-5 flex-col">
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                        }}
                        className="lg:text-xl text-center"
                      >
                        Your Wishlist is Empty
                      </span>

                      <div className="flex justify-center">
                        <Link
                          className="hover:underline font-bold bg-ThemGold py-2 px-4 rounded-xl "
                          href={"/"}
                        >
                          Back To Home
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
