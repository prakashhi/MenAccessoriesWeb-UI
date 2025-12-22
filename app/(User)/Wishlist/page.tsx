"use client";

import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import { UsePanel } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getUserFromStorage } from "@/context/utils";
import { ImageShowUtil } from "@/app/utils/ImageShowUtil";
import { formatIndianPrice } from "@/app/utils/FormatCurrency";
import {
  FiHeart,
  FiShoppingBag,
  FiX,
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import EmptyDataModel from "../Component/CommonComponet/EmptyDataModel";


export default function Page() {
  const user = useMemo(() => getUserFromStorage(), []);
  const { AddCartProduct, RemoveLikeProduct, LikeProductList, guestCart } =
    UsePanel();

  const [likeProductList, setLikeProductList] = useState<any[]>([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const LikeData = async () => {
      if (user) {
        let response = await LikeProductList(user.id);
        setLikeProductList(response.data);
      } else {
        setLikeProductList(Object.values(guestCart?.likeProduct || {}));
      }
    };

    LikeData();
  }, [user, guestCart]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <Nav />

      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto w-full">
        {/* TITLE - RESPONSIVE */}
        <div className="relative mb-8 md:mb-12 lg:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.2em] md:tracking-[0.3em] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            WISHLIST
          </motion.h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-300 mx-auto"></div>
        </div>

        <AnimatePresence mode="wait">
          {likeProductList?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              {likeProductList.map((item: any) => (
                <motion.div
                  key={item.likeId || item.product?.id || item.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ x: 2 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="group relative bg-white border border-neutral-200 hover:border-neutral-300 
                           transition-all duration-500 overflow-hidden rounded-lg sm:rounded-none sm:border-b sm:border-x-0"
                >
                  {/* HOVER BACKGROUND EFFECT - MOBILE OPTIMIZED */}
                  {/* <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-neutral-50 to-transparent 
                                translate-x-full group-hover:translate-x-full transition-transform duration-1000 hidden sm:block"
                  /> */}

                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                    {/* IMAGE - RESPONSIVE */}
                    <div
                      className="relative w-full sm:w-24 md:w-32 lg:w-36 h-48 sm:h-24 md:h-32 lg:h-36 overflow-hidden bg-neutral-100 
                                  border border-neutral-200 rounded-md group-hover:border-neutral-300 transition-all duration-500 shrink-0"
                    >
                      <Image
                        alt={item.name}
                        src={
                          user
                            ? ImageShowUtil(item.product.image)
                            : ImageShowUtil(item.image) ||
                              "/images/placeholder.webp"
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
                        className="object-cover object-center transition-transform duration-700 
                                 group-hover:scale-105 group-hover:opacity-90"
                        priority={false}
                      />

                      {/* MOBILE REMOVE BUTTON */}
                      <button
                        onClick={() => {
                          if (user) {
                            RemoveLikeProduct(item.product.id);

                            setLikeProductList((prev) =>
                              prev.filter(
                                (p) => p.product.id !== item.product.id
                              )
                            );
                          } else {
                            RemoveLikeProduct(item.id);
                          }
                        }}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-7 sm:h-7 cursor-pointer rounded-full bg-white/90 backdrop-blur-sm 
                                 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                                 transition-all duration-300 hover:bg-white border border-neutral-200 shadow-sm sm:shadow-none"
                        aria-label="Remove item"
                      >
                        <FiX className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-neutral-500" />
                      </button>
                    </div>

                    {/* PRODUCT INFO - RESPONSIVE */}
                    <div className="flex-1 w-full space-y-3 sm:space-y-4">
                      <div>
                        <h3
                          className="text-base sm:text-lg md:text-xl font-light tracking-wide text-neutral-800 
                                     mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {user ? item.product.name : item.name}
                        </h3>

                        {/* PRICE - MOBILE FIRST */}
                        <div className="flex items-center justify-between sm:justify-start sm:block">
                          <p className="text-lg sm:text-xl md:text-2xl font-light text-neutral-900 tracking-tight">
                            ₹
                            {user
                              ? formatIndianPrice(item.product.sellingPrice)
                              : formatIndianPrice(item.sellingPrice)}
                          </p>

                          {/* MOBILE ACTIONS */}
                          <div className="flex items-center gap-3 sm:hidden">
                            <button
                              onClick={() => {
                                AddCartProduct(item);
                                RemoveLikeProduct(item.id);
                              }}
                              className="px-4 cursor-pointer py-2 text-xs tracking-[0.2em] uppercase border border-neutral-900 text-neutral-900 
                                       hover:bg-neutral-900 hover:text-white transition-colors duration-300 rounded-sm"
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                ADD
                                <FiShoppingBag
                                  className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-500 
                                                   group-hover/btn:translate-x-1"
                                />
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                if (user) {
                                  RemoveLikeProduct(item.product.id);

                                  setLikeProductList((prev) =>
                                    prev.filter(
                                      (p) => p.product.id !== item.product.id
                                    )
                                  );
                                } else {
                                  RemoveLikeProduct(item.id);
                                }
                              }}
                              className="p-2 cursor-pointer text-neutral-400 hover:text-neutral-900 transition-colors"
                              aria-label="Remove"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* DESKTOP PRICE LABEL */}
                      {/* <div className="hidden sm:block">
                        <p className="text-sm tracking-[0.1em] text-neutral-500 font-light mb-1">
                          PRICE
                        </p>
                        <p className="text-xl md:text-2xl font-light text-neutral-900 tracking-widest">
                          ₹{formatIndianPrice(item.sellingPrice)}
                        </p>
                      </div> */}
                    </div>

                    {/* DESKTOP ACTION BUTTONS */}
                    <div className="hidden sm:flex flex-col gap-3 md:gap-4 items-end shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          AddCartProduct(item);
                          RemoveLikeProduct(item.id);
                        }}
                        className="relative cursor-pointer flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 text-xs tracking-[0.2em] md:tracking-[0.3em]
                                 uppercase border border-neutral-900 text-neutral-900 
                                 hover:bg-neutral-900 hover:text-white transition-all duration-500 
                                 overflow-hidden group/btn w-full sm:w-auto justify-center"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          ADD TO CART
                          <FiShoppingBag
                            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-500 
                                                   group-hover/btn:translate-x-1"
                          />
                        </span>
                        <div
                          className="absolute inset-0 bg-neutral-900 translate-x-full 
                                      group-hover/btn:translate-x-0 transition-transform duration-500"
                        />
                      </button>

                      <button
                        onClick={() => {
                          if (user) {
                            RemoveLikeProduct(item.product.id);

                            setLikeProductList((prev) =>
                              prev.filter(
                                (p) => p.product.id !== item.product.id
                              )
                            );
                          } else {
                            RemoveLikeProduct(item.id);
                          }
                        }}
                        className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-neutral-400 hover:text-neutral-900 
                                 transition-colors duration-300 flex items-center gap-1"
                      >
                        REMOVE
                        <FiChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* EMPTY STATE - RESPONSIVE */

            <EmptyDataModel
              message="Your Wishlist is Empty"
              Icon={
                <FiHeart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-neutral-400" />
              }
            />
          )}
        </AnimatePresence>

        {/* BOTTOM DECORATIVE LINE - RESPONSIVE */}
        {likeProductList?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-neutral-200"
          >
            <p className="text-xs tracking-[0.2em] text-neutral-500 text-center">
              {likeProductList.length} ITEM
              {likeProductList.length > 1 ? "S" : ""} CURATED
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
