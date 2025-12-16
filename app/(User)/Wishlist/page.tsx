"use client";

import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import { UsePanel } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import ItemCount from "../Cart/component/ItemCount";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "@/app/useApi";
import { notify } from "../Component/ToastComponent";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const { AddCartProduct, RemoveLikeProduct, LikeProductList } = UsePanel();

  const [likeProductList, setLikeProductList] = useState([]);

  const { callApi } = useApi();

  const getLikeProductData = useCallback(async () => {
    let res = await LikeProductList();
    setLikeProductList(res.data);
  }, []);

  useEffect(() => {
    getLikeProductData();
  }, []);

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
          WISHLIST
        </motion.h1>

        <AnimatePresence>
          {likeProductList?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-[#ECECEC] divide-y"
            >
              {likeProductList.map((item: any) => (
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

                    {/* <ItemCount
                      Quanty={item.Quanty}
                      id={item.id}
                      type="LikeProduct"
                    /> */}

                    <button
                      onClick={() => RemoveLikeProduct(item.id)}
                      className="text-xs tracking-widest text-gray-400 hover:text-black transition"
                    >
                      REMOVE
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="text-sm sm:text-base font-semibold">
                    ₹{item.price}.00
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => {
                      AddCartProduct();
                      RemoveLikeProduct(item.id);
                    }}
                    className="border border-black px-6 py-3 text-xs tracking-[0.3em]
                               hover:bg-black hover:text-white transition whitespace-nowrap"
                  >
                    ADD TO CART
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* EMPTY STATE */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-24 gap-6"
            >
              <p className="tracking-wide text-gray-500">
                Your wishlist is empty
              </p>

              <Link
                href="/"
                className="border border-black px-8 py-3 text-xs tracking-[0.3em]
                           hover:bg-black hover:text-white transition"
              >
                CONTINUE SHOPPING
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
