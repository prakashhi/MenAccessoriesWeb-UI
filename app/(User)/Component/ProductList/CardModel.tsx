"use client";

import { UsePanel } from "@/context/SerchPanelContext";
import Image from "next/image";
import { FcLikePlaceholder } from "react-icons/fc";
import Star from "./Star";
import { useRouter } from "next/navigation";
import { notify } from "../ToastComponent";

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
  const { AddCartProduct, AddLikeProduct } = UsePanel();
  const router = useRouter();

console.log("DataObj",DataObj,)

  return (
    <>
      {DataObj.products?.map((product) => (
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
            onClick={() =>
              router.push(`/all-Product/${product.product_name}/${product.id}`)
            }
            className="relative w-full h-72 cursor-pointer overflow-hidden"
          >
            <Image
              src={product.images?.[0]}
              alt={product.product_name}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                AddLikeProduct(product);
                notify({
                  message: `${product.product_name} added to Wishlist`,
                  type: "success",
                });
              }}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition"
            >
              <FcLikePlaceholder className="text-xl" />
            </button>

            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500">
              <p className="text-xs text-white line-clamp-3 mb-3">
                {product.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  AddCartProduct(product);
                  notify({
                    message: `${product.product_name} added to Cart`,
                    type: "success",
                  });
                }}
                className="w-full py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* INFO */}
          <div className="p-4 text-center space-y-1">
            <p className="text-[11px] uppercase tracking-widest text-gray-400">
              {product.category_name}
            </p>

            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
              {product.product_name}
            </h3>

            <Star starNum={4} />

            <div className="flex justify-center gap-2 items-center">
              <span className="text-base font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.discount_price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.discount_price}
                </span>
              )}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Stock: {product.stock}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
