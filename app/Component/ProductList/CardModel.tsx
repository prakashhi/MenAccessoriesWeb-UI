"use client";
import { UsePanel } from "@/context/SerchPanelContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FcLikePlaceholder } from "react-icons/fc";
import Star from "./Star";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { product } from "@/context/Types/type";
import Link from "next/link";

export default function CardModel({
  DataObj,
  CustomWH,
  category
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
        DataObj.map((value: any, index: number) => (
          <div
            className={
              CustomWH
                ? CustomWH
                : "hover:shadow-xl hover:scale-105 transition duration-500 ease-in-out  sm:w-56 md:w-64 lg:w-84 w-54  h-82  shrink-0  sm:h-64 md:h-[500px] lg:m-3  flex flex-col lg:gap-3 cursor-pointer m-1 shadow mt-10"
            }
            key={index}
          >
            <div
              className="flex-1 relative  "
              onClick={() => router.push(`/all-Product/${category}/${value.id}`)}
            >
              <Image
                className="object-cover "
                src={value?.img}
                alt={`${value.name}`}
                sizes="100"
                loading="eager"
                fill
                // width={300}
                // height={300}
              />

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  AddLikeProduct(value);
                  toast(
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-lg text-yellow-400">
                        {value.name}
                      </span>
                      <span className="text-sm text-white/90">
                        Product is added to your Wishlist!
                      </span>
                    </div>,
                    {
                      style: {
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        marginTop: "20px",
                        backgroundColor: "#1f1f1f", // dark card-like background
                        color: "#fff",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        maxWidth: "300px",
                      },
                      hideProgressBar: true,
                      position: "bottom-center",
                      autoClose: 1000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    }
                  );
                }}
                title="Add to Wishlist"
                className="relative z-1  bg-white  rounded-full w-6 h-6 flex justify-center   shadow-md lg:left-[87%] left-[85%] top-3 items-center "
              >
                <FcLikePlaceholder className="" />
              </div>
            </div>

            <div className="flex flex-col items-center  gap-1 p-3"  onClick={() => router.push(`/all-Product/${category}/${value.id}`)}>
              <span
                style={{ fontFamily: "sans-serif", fontWeight: 700 }}
                className="font-semibold text-center lg:text-medium sm:text-medium text-[10px]"
              >
                {value.name}
              </span>

              <Star starNum={value.rating} />

              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
                className="text-center lg:text-medium sm:text[15px] text-[10px]"
              >
                Rs {value.price}.00
              </span>
            </div>

            <div className=" justify-center  p-3 ">
              <Button
                onPress={(e) => {
                  AddCartProduct(value);
                  toast(
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-lg text-yellow-400">
                        {value.name}
                      </span>
                      <span className="text-sm font-bold text-black/80">
                        Add to your Cart!
                      </span>
                    </div>,
                    {
                      style: {
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        marginTop: "20px",
                        backgroundColor: "#fff", // dark card-like background
                        color: "black",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        maxWidth: "300px",
                      },
                      hideProgressBar: true,
                      position: "top-center",
                      autoClose: 1000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    }
                  );
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                }}
                className="lg:text-medium overflow-hidden sm:text-[10px] bg-HoverThemDeepGray  text-[9px] border border-black hover:border-transparent hover:text-white   w-full p-2"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        ))}
    </>
  );
}
