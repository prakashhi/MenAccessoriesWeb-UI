"use client";

import Link from "next/link";
import { Heart, User, ShoppingBag, Search } from "lucide-react";
import { UsePanel } from "@/context/Context";
import { motion } from "framer-motion";

import SearchInput from "@/Component/NavBar/Component/SearchInput";

import { useEffect, useMemo, useRef, useState } from "react";
import { notify } from "../ToastComponent";
import { useGuestUser } from "@/context/GuestUserContext";
import { useUserCart } from "@/context/UserCartContext";
import { useUserLike } from "@/context/UserLikeContext";
import MobileNumberLogin from "../CommonComponet/LoginModel/login";
import OTPModal from "../CommonComponet/LoginModel/OTPFill";
import UserCreateForm from "../CommonComponet/UserCreateFrom/UserCreateForm";

type length = {
  likeProductLength: number;
  CartProductLength: number;
};

export type mobileConfigType = {
  mobileNumber: string;
  CountryCode: string;
};

export default function Nav() {
  const { triggerRefresh, userCountData, userDataContext, user } = UsePanel();

  const [stateModel, setStateModel] = useState({
    LoginModel: false,
    OTPFillModel: false,
    UserCreateModel: false,
  });

  const [mobileConfig, setMobileConfig] = useState<mobileConfigType>({
    mobileNumber: "",
    CountryCode: "",
  });

  const { GuestUserDataLength, guestCart } = useGuestUser();

  const { AddCartProduct } = useUserCart();
  const { AddLikeProduct } = useUserLike();

  const [isMerging, setIsMerging] = useState(false);

  const [state, setState] = useState<length>({
    likeProductLength: 0,
    CartProductLength: 0,
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          AddCartProduct(item.id, item.variantSizeId)
        )
      );

      cartResults.forEach((res, index) => {
        const item = cartItems[index];
        if (
          res.status === "rejected" &&
          res.reason?.message !== "Error: Cart item already exists"
        ) {
          failedCart.push(item);
        }
      });

      // ---- WISHLIST MERGE ----
      const likeResults = await Promise.allSettled(
        likeItems.map((item: any) => AddLikeProduct(item))
      );

      likeResults.forEach((res, index) => {
        const item = likeItems[index];
        if (
          res.status === "rejected" &&
          res.reason?.message !== "Error: Like product already exists"
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
      if (!user?.id) {
        setState({
          likeProductLength: GuestUserDataLength.Like ?? 0,
          CartProductLength: GuestUserDataLength.Cart ?? 0,
        });
        return;
      } else {
        if (user) {
          await MergeLogic();

          setState((prev) => ({
            ...prev,
            likeProductLength: userCountData?.LikeCount,
            CartProductLength: userCountData?.CartCount,
          }));
        }
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

  const shouldHide = isMobile && searchOpen;

  console.log("userCountData", guestCart, GuestUserDataLength);

  return (
    <>
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

            <Link className="relative" href="/wishlist">
              {state.likeProductLength > 0 && (
                <div className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex justify-center items-center">
                  {state.likeProductLength}
                </div>
              )}
              <Heart
                size={20}
                className="text-gray-700 hover:text-red-500 transition-colors"
              />
            </Link>

            {userDataContext.info !== null ? (
              <Link href={"/accountInfo"}>
                <User
                  size={20}
                  className="text-gray-700 hover:text-black transition-colors cursor-pointer"
                />
              </Link>
            ) : (
              <button
                onClick={() =>
                  setStateModel((prev) => ({ ...prev, LoginModel: true }))
                }
                className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
              >
                Login
              </button>
            )}

            <Link className="relative" href="/cart">
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

      {stateModel.LoginModel == true && (
        <MobileNumberLogin
          open={stateModel.LoginModel}
          onClose={() =>
            setStateModel((prev) => ({ ...prev, LoginModel: false }))
          }
          onConfirm={(mobile, code) => {
            setMobileConfig((prev) => ({
              ...prev,
              mobileNumber: mobile,
              CountryCode: code,
            }));
            setStateModel((prev) => ({ ...prev, OTPFillModel: true }));
          }}
        />
      )}

      {stateModel.OTPFillModel === true && (
        <OTPModal
          open={stateModel.OTPFillModel}
          mobileData={mobileConfig}
          onClose={() =>
            setStateModel((prev) => ({ ...prev, OTPFillModel: false }))
          }
          onIfUserCreate={() =>
            setStateModel((prev) => ({ ...prev, UserCreateModel: true }))
          }
        />
      )}

      {stateModel.UserCreateModel == true && (
        <UserCreateForm
          open={stateModel.UserCreateModel}
          mobileNumber={mobileConfig.mobileNumber}
          onClose={() =>
            setStateModel((prev) => ({
              ...prev,
              UserCreateModel: false,
            }))
          }
        />
      )}
    </>
  );
}
