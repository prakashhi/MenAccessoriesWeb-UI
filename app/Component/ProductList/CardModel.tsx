"use client";
import { UsePanel } from "@/context/SerchPanelContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FcLikePlaceholder } from "react-icons/fc";
import Star from "./Star";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { product } from "@/context/Types/type";

export default function CardModel({
  DataObj,
  CustomWH,
  category,
}: {
  DataObj: product[];
  CustomWH: string;
  category: string;
}) {
  const { AddCartProduct, AddLikeProduct } = UsePanel();
  const router = useRouter();

  return (
    <>
      {DataObj &&
        DataObj.map((item: product, idx: number) => (
          <div
            key={idx}
            className={`relative group flex flex-col items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer ${
              CustomWH ? CustomWH : "w-56 sm:w-64 md:w-72 lg:w-80 h-auto m-3"
            }`}
          >
            {/* Product Image */}
            <div
              className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden"
              onClick={() => router.push(`/all-Product/${category}/${item.id}`)}
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />

              {/* Wishlist Button */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  AddLikeProduct(item);
                  toast.success(`${item.name} added to Wishlist!`, {
                    position: "bottom-center",
                    autoClose: 1200,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 hover:scale-110 transition"
                title="Add to Wishlist"
              >
                <FcLikePlaceholder className="text-lg" />
              </div>

              {/* Hover Info Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-white">
                <p className="text-sm line-clamp-3">
                  {item.description || "No description"}
                </p>
                <Button
                  onPress={() => {
                    AddCartProduct(item);
                    toast.success(`${item.name} added to Cart!`, {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                  }}
                  className="mt-3 bg-white text-black hover:bg-gray-900 hover:text-white transition px-3 py-1 rounded-sm text-sm"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col items-center p-3 w-full">
              <h3
                className="text-sm sm:text-base font-semibold text-center line-clamp-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.name}
              </h3>
              <Star starNum={item.rating} />
              <p className="text-sm font-medium text-gray-800 mt-1">
                Rs {item.price}.00
              </p>
            </div>
          </div>
        ))}
      <ToastContainer />
    </>
  );
}
