"use client";
import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import Image from "next/image";
import { MdOutlineDeleteForever } from "react-icons/md";

import { UsePanel } from "@/context/SerchPanelContext";
import { useCallback, useMemo, useState, useEffect } from "react";
import Link from 'next/link'

export default function page() {
  const [total, setTotal] = useState(0);

  const { cartProduct, RemoveCartProduct } = UsePanel();

  const TotalAmount = useMemo(() => {
    let sum = 0;
    cartProduct.map((val: any) => (sum = sum + val.price));
    return sum;
  }, [cartProduct]);

  useEffect(() => {
    setTotal(TotalAmount);
  }, [TotalAmount]);

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
                className="lg:text-2xl"
              >
                Cart
              </span>

              <div className="grid  lg:gap-5 gap-3 w-full  ">
                {cartProduct.length > 0 ? (
                  cartProduct.map((val, i) => (
                    <div
                      key={i}
                      className="flex justify-around items-center   p-3"
                    >
                      <Image
                        className=""
                        src={val.img}
                        width={100}
                        height={100}
                        alt={`${i}`}
                      />

                      <div className="col-span-2">
                        <span>{val.name}</span>
                      </div>

                      <span>{val.price}</span>
                      <MdOutlineDeleteForever
                        onClick={() => RemoveCartProduct(val.id)}
                        className="text-red-300 cursor-pointer"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center text-center gap-3 mt-5 flex-col">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 300,
                      }}
                      className="lg:text-xl text-center"
                    >
                      Your Cart is Empty
                    </span>

                    <Link className="hover:underline" href={"/"}>Back To Home</Link>
                  </div>
                )}
              </div>

              {total > 0 && (
                <div className="flex justify-center  w-full px-5 gap-2">
                  <span>Total Amount:</span>
                  <span>{total}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
