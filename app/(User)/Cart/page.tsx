"use client";

import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import Image from "next/image";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import ItemCount from "./component/ItemCount";

export default function page() {
  const [total, setTotal] = useState(0);
  const { cartProduct, RemoveCartProduct } = UsePanel();

  const TotalAmount = useMemo(
    () =>
      cartProduct.reduce(
        (sum: number, item: any) => sum + item.price * item.Quanty,
        0
      ),
    [cartProduct]
  );

  useEffect(() => {
    setTotal(TotalAmount);
  }, [TotalAmount]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8]">
      <Nav />

      {/* Main */}
      <div className="flex-1 mt-8 px-3 sm:px-5 max-w-5xl mx-auto w-full">
        {/* Heading */}
        <h1
          className="text-center font-extrabold text-xl sm:text-3xl tracking-tight mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Your Cart
        </h1>

        {/* Layout */}
        <div className="flex flex-col mb-10 lg:flex-row gap-6 w-full">
          {/* CART LIST */}
          <div
            className="flex-1 
      bg-white rounded-xl shadow-sm p-4 sm:p-6
      overflow-y-auto
      max-h-full
      lg:max-h-[50vh]"
          >
            {cartProduct.length > 0 ? (
              <div className="flex flex-col divide-y divide-gray-200">
                {cartProduct.map((val: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4"
                  >
                    {/* LEFT SIDE PRODUCT */}
                    <div className="flex flex-row gap-4 sm:gap-6">
                      <Image
                        className="rounded-lg object-cover w-20 h-20 sm:w-24 sm:h-24"
                        src={val.img}
                        width={90}
                        height={90}
                        alt={val.name}
                        priority
                      />

                      <div className="flex flex-col gap-2">
                        <span className="font-semibold text-[14px] sm:text-lg leading-tight">
                          {val.name}
                        </span>

                        {/* Item Counter */}
                        <ItemCount Quanty={val.Quanty} id={val.id} />

                        {/* Remove Button */}
                        <Button
                          size="sm"
                          variant="flat"
                          className="text-red-500 w-fit"
                          onPress={() => RemoveCartProduct(val.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* PRICE (Moves below on mobile) */}
                    <div className="flex sm:items-center sm:justify-end">
                      <span className="font-bold text-base sm:text-lg">
                        ₹{val.price}.00
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-10 gap-4">
                <span className="text-lg sm:text-xl font-semibold">
                  Your Cart is Empty
                </span>

                <Link
                  href="/"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition"
                >
                  Back To Home
                </Link>
              </div>
            )}
          </div>

          {/* TOTAL BOX */}
          {total > 0 && (
            <div className="lg:w-[35%] w-full mb-10 lg:mb-0">
              <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
                <div className="flex justify-between mb-4 text-[15px] sm:text-lg">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-bold">₹{total}.00</span>
                </div>

                {/* Discount Input */}
                <div className="flex mb-5">
                  <input
                    type="text"
                    placeholder="Discount Code"
                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm outline-none"
                  />
                  <Button className="bg-black text-white text-sm rounded-r-md px-4">
                    Apply
                  </Button>
                </div>

                {/* Checkout */}
                <Button className="bg-black text-white w-full py-3 rounded-lg text-center font-semibold hover:opacity-80">
                  CHECK OUT
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
