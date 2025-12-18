"use client";

import Link from "next/link";
import { Heart, User, ShoppingBag, Search } from "lucide-react";
import { UsePanel } from "@/context/Context";

import data from "../../Search";
import { useCallback, useEffect, useState } from "react";

export default function Nav() {
  const [state, setState] = useState({
    likeProductLength: 0,
    CartProductLength: 0,
  });
  const { LikeProductList, CartProductList ,GuestUserDataLength} = UsePanel();


  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3  py-4">
        {/* Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="lg:text-4xl text-medium font-serif tracking-widest text-black cursor-pointer"
          >
            RockRoars
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/Search">
            <Search
              size={20}
              className="text-gray-700 hover:text-black transition-colors"
            />
          </Link>

          <Link className="relative" href="/Wishlist">
            {GuestUserDataLength.Like > 0 && (
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-black text-white rounded-full text-[10px] flex justify-center items-center">
                {GuestUserDataLength.Like}
              </div>
            )}
            <Heart
              size={20}
              className="text-gray-700 hover:text-red-500 transition-colors"
            />
          </Link>

          <Link href={"/AccountInfo"}>
            <User
              size={20}
              className="text-gray-700 hover:text-black transition-colors cursor-pointer"
            />
          </Link>

          <Link className="relative" href="/Cart">
            {GuestUserDataLength.Cart > 0 && (
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-black text-white rounded-full text-[10px] flex justify-center items-center">
                {GuestUserDataLength.Cart}
              </div>
            )}
            <ShoppingBag
              size={20}
              className="text-gray-700 hover:text-black transition-colors"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
