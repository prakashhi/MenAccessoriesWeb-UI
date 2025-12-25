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

import {
  LikeProductType,
  ProductInfoType,
  GuestLikeItem,
  UserLikeItem,
} from "@/app/(User)/Type/Types";

import { useRouter } from "next/navigation";
import { useApi } from "@/app/useApi";

export default function Page() {
  const user = useMemo(() => getUserFromStorage(), []);
  const { AddCartProduct, RemoveLikeProduct, LikeProductList, guestCart } =
    UsePanel();

  const { callApi } = useApi();

  const [likeProductList, setLikeProductList] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const LikeData = async () => {
      setLoading(true);
      if (user) {
        let response = await LikeProductList(user.id);
        setLikeProductList(response.data);
      } else {
        //  console.log(Object.values(guestCart.likeProduct || {}))
        setLikeProductList(Object.values(guestCart.likeProduct || {}));
      }
      setLoading(false);
    };

    LikeData();
  }, [user, guestCart]);

  type HandleCart = GuestLikeItem | UserLikeItem;

  const addToCartHandle = async (item: HandleCart) => {
    if (user && item.type === "user") {
      try {
        AddCartProduct(item);
        let response = await callApi(
          "delete",
          `/like-product/${user.id}/${item.product.id}`
        );

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(item);
      AddCartProduct(item);
      RemoveLikeProduct(item.id);
    }
  };

  console.log(guestCart);

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
          {loading ? (
            <motion.div
              className="grid lg:grid-cols-3 grid-cols-1 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-72 bg-gray-200 rounded-lg animate-pulse"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </motion.div>
          ) : likeProductList?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid lg:grid-cols-3 grid-cols-1 gap-3"
            >
              {likeProductList.map((item: any) => (
                <motion.div
                  key={item.likeId || item.product?.id || item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white border border-gray-100 hover:border-gray-200
             transition-all duration-300 overflow-hidden"
                >
                  {/* IMAGE */}
                  <div className="relative w-full h-64 md:h-72 bg-gray-50 overflow-hidden">
                    <Image
                      onClick={() =>
                        router.push(
                          `/all-Product/${user ? item.product?.id : item.id}`
                        )
                      }
                      alt={user ? item.product.name : item.name}
                      src={
                        user
                          ? ImageShowUtil(item.product.image)
                          : ImageShowUtil(item.image) ||
                            "/images/placeholder.webp"
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* REMOVE */}
                    <button
                      onClick={() => {
                        if (user) {
                          RemoveLikeProduct(item.product.id);
                          setLikeProductList((prev) =>
                            prev.filter((p) => p.product.id !== item.product.id)
                          );
                        } else {
                          RemoveLikeProduct(item.id);
                        }
                      }}
                      className="absolute cursor-pointer top-3 right-3 w-8 h-8 rounded-full bg-white/90
                 backdrop-blur-sm flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FiX className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col gap-4">
                    {/* TITLE */}
                    <div>
                      <h3
                        className="text-md font-light tracking-wide text-gray-900 line-clamp-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {user ? item.product.name : item.name}
                      </h3>

                      <p className="text-xs text-gray-500 uppercase tracking-[0.12em] mt-1">
                        {user ? item.product.category : item.categoryName}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div>
                      <p className="text-xl font-light text-gray-900">
                        ₹
                        {user
                          ? formatIndianPrice(item.product.sellingPrice)
                          : formatIndianPrice(item.sellingPrice)}
                      </p>
                    </div>

                    {/* VARIANTS */}
                    {(item.product?.variants || item.variants) && (
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <span>Color</span>
                          <div className="flex gap-1">
                            {(user
                              ? item.product.variants?.colors
                              : item.variants?.colors
                            )
                              ?.slice(0, 3)
                              .map((color: string, i: number) => (
                                <span
                                  key={i}
                                  className="w-3.5 h-3.5 rounded-full border border-gray-200"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {(user
                            ? item.product.variants?.sizes
                            : item.variants?.sizes
                          )
                            ?.slice(0, 2)
                            .map((size: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 border border-gray-200 text-xs"
                              >
                                {size}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          addToCartHandle(item);
                        }}
                        className="w-full py-2.5 border cursor-pointer border-gray-900 rounded-sm text-gray-900
                   text-xs tracking-[0.15em] uppercase
                   hover:bg-gray-900 hover:text-white transition"
                      >
                        Add to Cart
                      </button>

                      <span
                        className={`text-xs text-center py-1 ${
                          (user ? item.product.stock : item.stock) > 0
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {(user ? item.product.stock : item.stock) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
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
