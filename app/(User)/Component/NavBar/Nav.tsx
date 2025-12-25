"use client";

import Link from "next/link";
import { Heart, User, ShoppingBag, Search } from "lucide-react";
import { UsePanel } from "@/context/Context";
import { motion, AnimatePresence } from "framer-motion";

import SearchInput from "@/app/(User)/Component/NavBar/Component/SearchInput";

import { useEffect, useMemo, useState } from "react";
import { getUserFromStorage } from "@/context/utils";

export default function Nav() {
  const user = useMemo(() => getUserFromStorage(), []);
  const [state, setState] = useState({
    likeProductLength: 0,
    CartProductLength: 0,
  });
  const { LikeProductList, CartProductList, GuestUserDataLength } = UsePanel();

  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const LengthData = async () => {
      if (!user) {
        setState({
          likeProductLength: GuestUserDataLength.Like,
          CartProductLength: GuestUserDataLength.Cart,
        });
        return;
      }

      let [CartData, LikeData] = await Promise.all([
        CartProductList(user.id),
        LikeProductList(user.id),
      ]);

      setState((prev) => ({
        ...prev,
        likeProductLength: LikeData?.data?.length ?? 0,
        CartProductLength: CartData?.data?.length ?? 0,
      }));
    };

    LengthData();
  }, [GuestUserDataLength]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // Tailwind lg breakpoint
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide logo only on mobile when searchOpen
  const shouldHide = isMobile && searchOpen;

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3  py-4">
        {/* Logo */}

        <div className={`${shouldHide ? "hidden" : ""} flex-1`}>
          <Link
            href="/"
            className="lg:text-4xl text-medium font-serif tracking-widest text-black cursor-pointer"
          >
            RockRoars
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {searchOpen ? (
            <SearchInput onClose={() => setSearchOpen(false)} />
          ) : (
            <motion.div
              key="search-icon"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Search
                onClick={() => setSearchOpen(true)}
                size={20}
                className="text-gray-700 cursor-pointer hover:text-black transition-colors"
              />
            </motion.div>
          )}

          <Link className="relative" href="/Wishlist">
            {state.likeProductLength > 0 && (
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-black text-white rounded-full text-[10px] flex justify-center items-center">
                {state.likeProductLength}
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
            {state.CartProductLength > 0 && (
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-black text-white rounded-full text-[10px] flex justify-center items-center">
                {state.CartProductLength}
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
