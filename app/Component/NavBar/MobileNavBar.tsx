"use client";

import { Search, Menu, Heart, ShoppingBag, User } from "lucide-react";

import { UsePanel } from "@/context/SerchPanelContext";
import Link from "next/link";

import { Category } from "../Categotys";

import { usePathname } from "next/navigation";

export default function Nav() {
  const { cartProduct, likeProduct } = UsePanel();
  const pathname = usePathname();
  return (
    <>
      <nav className=" lg:hidden   w-full    sticky  bottom-0 z-10 bg-white">
        <div className="flex flex-row border-b-1 min-h-3 sticky bottom-0 px-4 py-5 border-gray-50 items-center justify-between ">
          <div className="flex flex-row items-center gap-10">
            <Link className="flex flex-row gap-2 items-center" href={"/"}>
              <Menu size={17} />
              <span className="text-sm">Menu</span>
            </Link>

            {pathname !== "/Search" && (
              <div className="">
                <Link
                  className="flex flex-row gap-2 items-center"
                  href={"/Search"}
                >
                  <Search size={17} />
                  <span>Search</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-5">
            <Link className="relative" href={"/Wishlist"}>
              {likeProduct.length > 0 && (
                <div className="w-3.5  h-3.5 border border-gray-200 flex justify-center items-center rounded-full p-1 absolute bottom-3.5 text-[10px]  left-4 bg-white">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                    }}
                    className="text-center "
                  >
                    {likeProduct.length}
                  </span>{" "}
                </div>
              )}

              <Heart size={20} />
            </Link>

            <User size={20} className="cursor-pointer " />

            <Link className="relative" href={"/Cart"}>
              {cartProduct.length > 0 && (
                <div className="w-3.5  h-3.5 border border-gray-200 flex justify-center items-center rounded-full p-1 absolute bottom-3.5 text-[10px]  left-4 bg-white">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 800,
                    }}
                    className="text-center "
                  >
                    {cartProduct.length}
                  </span>{" "}
                </div>
              )}

              <ShoppingBag size={23} className="cursor-pointe" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
