"use client";

import Link from "next/link";
import { Heart, User, ShoppingBag, Search } from "lucide-react";
import { UsePanel } from "@/context/Context";
import { motion } from "framer-motion";

import SearchInput from "@/app/(User)/Component/NavBar/Component/SearchInput";

import { useEffect, useMemo, useRef, useState } from "react";
import { getUserFromStorage } from "@/context/utils";
import { useApi } from "@/app/useApi";
import { notify } from "../ToastComponent";

type length = {
  likeProductLength: number;
  CartProductLength: number;
};

export default function Nav() {
  const { GuestUserDataLength, userCountData, triggerRefresh } = UsePanel();

  const { callApi } = useApi();
  const user = useMemo(() => getUserFromStorage(), []);
  const [isMerging, setIsMerging] = useState(false);

  const [state, setState] = useState<length>({
    likeProductLength: 0,
    CartProductLength: 0,
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const CountLikeCartFun = async () => {
    setState((prev) => ({
      ...prev,
      likeProductLength: userCountData.LikeCount,
      CartProductLength: userCountData.CartCount,
    }));
  };

  const MergeLogic = async () => {
    if (!user?.id) return;

    if (localStorage.getItem("guest_cart_merged") === "true") return;
    if (localStorage.getItem("guest_cart_merge_in_progress") === "true") return;

    localStorage.setItem("guest_cart_merge_in_progress", "true");
    setIsMerging(true);

    const guestData = JSON.parse(localStorage.getItem("GuestUserData") || "{}");

    // 🔧 CHANGED: freeze data to avoid index mismatch
    const cartItems = [...Object.values(guestData?.items ?? {})];
    const likeItems = [...Object.values(guestData?.likeProduct ?? {})];

    if (cartItems.length === 0 && likeItems.length === 0) {
      localStorage.setItem("guest_cart_merged", "true");
      localStorage.removeItem("guest_cart_merge_in_progress");
      setIsMerging(false);
      return;
    }

    const failedCart: any[] = [];
    const failedLikes: any[] = [];

    try {
      // ---- CART MERGE ----
      const cartResults = await Promise.allSettled(
        cartItems.map((item: any) =>
          callApi(
            "post",
            "/cart",
            {
              data: {
                productId: item.id,
                userId: user.id,
                variantSizeId: item.variantSizeId ?? null,
              },
            },
            true
          )
        )
      );

      cartResults.forEach((res, index) => {
        const item = cartItems[index];
        if (
          res.status === "rejected" &&
          res.reason?.response?.data?.message !==
            "Error: Cart item already exists"
        ) {
          failedCart.push(item);
        }
      });

      // ---- WISHLIST MERGE ----
      const likeResults = await Promise.allSettled(
        likeItems.map((item: any) =>
          callApi(
            "post",
            "/like-product",
            {
              data: {
                productId: item.id,
                userId: user.id,
              },
            },
            true
          )
        )
      );

      likeResults.forEach((res, index) => {
        const item = likeItems[index];
        if (
          res.status === "rejected" &&
          res.reason?.response?.data?.message !==
            "Error: Like product already exists"
        ) {
          failedLikes.push(item);
        }
      });

      //---- UPDATE LOCAL STORAGE ----
      if (failedCart.length === 0 && failedLikes.length === 0) {
        // ✅ All succeeded

        localStorage.removeItem("GuestUserData");
        localStorage.setItem("guest_cart_merged", "true");
        console.log("✅ Guest merge completed fully");

        notify({
          message: "Your cart and wishlist have been successfully synced.",
          type: "success",
        });
        triggerRefresh();
      } else {
        // ❌ Partial failure → keep only failed items
        localStorage.setItem(
          "GuestUserData",
          JSON.stringify({
            items: failedCart,
            likeProduct: failedLikes,
          })
        );
        console.warn("⚠️ Some items failed, will retry next login");
      }
    } catch (err) {
      console.error("Merge crash:", err);
    } finally {
      localStorage.removeItem("guest_cart_merge_in_progress");
      setIsMerging(false);
    }
  };

  useEffect(() => {
    const LengthData = async () => {
      if (!user) {
        setState({
          likeProductLength: GuestUserDataLength.Like,
          CartProductLength: GuestUserDataLength.Cart,
        });
        return;
      } else {
        await MergeLogic();
        await CountLikeCartFun();
      }
    };

    LengthData();
  }, [
    GuestUserDataLength,
    user?.id,
    isMerging,
    userCountData.LikeCount,
    userCountData.CartCount,
  ]);

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
