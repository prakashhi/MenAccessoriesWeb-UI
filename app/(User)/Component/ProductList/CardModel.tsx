"use client";

import { UsePanel } from "@/context/Context";
import Image from "next/image";
import { FcLikePlaceholder } from "react-icons/fc";
import Star from "./Star";
import { useRouter } from "next/navigation";
import { useApi } from "@/app/useApi";
import { formatIndianPrice } from "@/app/utils/FormatCurrency";
import ItemCount from "../../Cart/component/ItemCount";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { RiShoppingCart2Line, RiCheckLine } from "react-icons/ri";

import { Heart } from "lucide-react";

import { useEffect } from "react";
import { HeartIcon } from "./HeartIcon";

type ProductCard = {
  id: string;
  product_name: string;
  description: string;
  price: number;
  discount_price: number | null;
  images: string[];
  product_colors: string[] | string;
  stock: number;
  category: {
    category_name: string;
  };
};

export default function CardModel({
  DataObj,
  CustomWH,
}: {
  DataObj: ProductCard[];
  CustomWH?: string;
}) {
  const { AddCartProduct, AddLikeProduct, guestCart } = UsePanel();
  const router = useRouter();

  // let iscart = !!guestCart?.items?.[product.id];
 

  // useEffect(() => {
  //   if (!iscart) return;

  //   const timer = setTimeout(() => {
  //     // keep cart but revert UI text
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, [iscart]);

  if (DataObj.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 tracking-widest">NO PRODUCTS FOUND</p>
      </div>
    );
  }

  return (
    <>
      {DataObj.length > 1 &&
        DataObj.map((product) => {
          let iscart = !!guestCart?.items?.[product.id];
          let isLike = !!guestCart?.likeProduct?.[product.id];

          return (
            <div
              key={product.id}
              className={`
            group relative bg-white rounded-2xl overflow-hidden
            border border-gray-100 shadow-sm
            hover:shadow-2xl hover:-translate-y-2
            transition-all duration-500
            ${CustomWH ?? "w-72"}
          `}
            >
              {/* IMAGE */}

              <div
                onClick={() => router.push(`/all-Product/${product.id}`)}
                className="relative w-full h-82 cursor-pointer overflow-hidden"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${
                    product?.image.split("/")[1]
                  }`}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* Wishlist */}
                {isLike == true ? (
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition">
                    <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      AddLikeProduct(product);
                    }}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition"
                  >
                    <FcLikePlaceholder className="text-xl" />
                  </button>
                )}

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-xs text-white line-clamp-3 mb-3">
                    {product.description}
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      AddCartProduct(product);
                    }}
                    className="w-full py-2.5 rounded-lg bg-white text-neutral-900 text-sm font-medium
             flex items-center justify-center gap-2
             hover:bg-neutral-900 hover:text-white
             transition-colors duration-500"
                  >
                    <AnimatePresence mode="wait">
                      {!iscart ? (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="flex items-center gap-2"
                        >
                          <RiShoppingCart2Line size={16} />
                          ADD TO CART
                        </motion.span>
                      ) : (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="flex items-center gap-2 text-emerald-600"
                        >
                          <motion.span
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          >
                            <CircleCheck size={18} />
                          </motion.span>
                          ADDED
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>

              {/* INFO */}
              <div className="p-4 text-center space-y-1">
                {/* <p className="text-[11px] uppercase tracking-widest text-gray-400">
              {product.category_name}
            </p> */}

                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>

                {/* <Star starNum={4} /> */}

                <div className="flex justify-center gap-2 items-center">
                  <span className="text-base font-bold text-gray-900">
                    ₹{formatIndianPrice(product.sellingPrice)}
                  </span>
                  {product.discount_price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{formatIndianPrice(product.discount_price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
