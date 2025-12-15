"use client";

import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import Image from "next/image";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { useMemo } from "react";
import Link from "next/link";
import ItemCount from "./component/ItemCount";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const { cartProduct, RemoveCartProduct } = UsePanel();

  const total = useMemo(
    () =>
      cartProduct.reduce(
        (sum: number, item: any) => sum + item.price * item.Quanty,
        0
      ),
    [cartProduct]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111]">
      <Nav />

      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-12 max-w-6xl mx-auto w-full">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-3xl lg:text-4xl font-medium tracking-[0.3em] mb-14"
          style={{ fontFamily: "ui-serif, serif" }}
        >
          SHOPPING CART
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* CART LIST */}
          <div className="flex-1  rounded-2xl ">
            <AnimatePresence>
              {cartProduct.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="divide-y"
                >
                  {cartProduct.map((item: any) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col sm:flex-row gap-6 p-6 items-start sm:items-center"
                    >
                      {/* IMAGE */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F2F2F2] shrink-0">
                        <Image
                          src={item.img || "/images/placeholder.webp"}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1 space-y-3">
                        <h3 className="text-sm sm:text-base font-medium tracking-wide">
                          {item.name}
                        </h3>

                        <ItemCount Quanty={item.Quanty} id={item.id} />

                        <button
                          onClick={() => RemoveCartProduct(item.id)}
                          className="text-xs tracking-widest text-gray-400 hover:text-black transition"
                        >
                          REMOVE
                        </button>
                      </div>

                      {/* PRICE */}
                      <div className="text-sm sm:text-base font-semibold">
                        ₹{item.price}.00
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-16 gap-6"
                >
                  <p className="tracking-wide text-gray-500">
                    Your cart is empty
                  </p>

                  <Link
                    href="/"
                    className="border border-black px-8 py-3 text-xs tracking-[0.3em] hover:bg-black hover:text-white transition"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SUMMARY */}
          {total > 0 && (
            <motion.aside
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-[34%]"
            >
              <div className="bg-white rounded-2xl border border-[#ECECEC] p-6 sticky top-24 space-y-6">
                <div className="flex justify-between text-sm tracking-wide">
                  <span>Total</span>
                  <span className="font-semibold">₹{total}.00</span>
                </div>

                {/* DISCOUNT */}
                <div className="flex">
                  <input
                    placeholder="Discount code"
                    className="flex-1 border border-gray-300 px-4 py-3 text-sm outline-none"
                  />
                  <button className="px-5 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition">
                    APPLY
                  </button>
                </div>

                {/* CHECKOUT */}
                <button className="w-full bg-black text-white py-4 text-xs tracking-[0.3em] hover:bg-neutral-900 transition">
                  CHECKOUT
                </button>
              </div>
            </motion.aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
