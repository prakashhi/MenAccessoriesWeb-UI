"use client";

import Link from "next/link";
import { Heart, User, ShoppingBag, Search } from "lucide-react";
import { UsePanel } from "@/context/Context";
import { motion } from "framer-motion";
import SearchInput from "@/Component/NavBar/Component/SearchInput";
import { useEffect, useRef, useState } from "react";
import { notify } from "../ToastComponent";
import { useGuestUser } from "@/context/GuestUserContext";
import { useUserCart } from "@/context/UserCartContext";
import { useUserLike } from "@/context/UserLikeContext";
import MobileNumberLogin from "../CommonComponet/LoginModel/login";
import OTPModal from "../CommonComponet/LoginModel/OTPFill";
import UserCreateForm from "../CommonComponet/UserCreateFrom/UserCreateForm";
import MobileMenuModal from "./Component/MobileMoreMenu";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";

export type length = {
  likeProductLength: number;
  CartProductLength: number;
};

export type mobileConfigType = {
  mobileNumber: string;
  CountryCode: string;
};

export default function Nav() {
  const {
    triggerRefresh,
    userCountData,
    userDataContext,
    user,
    loginModel,
    setLoginModel,
  } = UsePanel();

  const [mobileConfig, setMobileConfig] = useState<mobileConfigType>({
    mobileNumber: "",
    CountryCode: "",
  });

  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/search");

  const { GuestUserDataLength } = useGuestUser();
  const { AddCartProduct, incrementCartProduct, CartProductList } =
    useUserCart();
  const { AddLikeProduct } = useUserLike();

  const [isMerging, setIsMerging] = useState(false);
  const [state, setState] = useState<length>({
    likeProductLength: 0,
    CartProductLength: 0,
  });

  const [searchOpen, setSearchOpen] = useState(isSearchPage ? true : false);
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
          AddCartProduct(item.id, item.variantSizeId),
        ),
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

      let res = await MergeCartQuantity(cartItems);

      // ---- WISHLIST MERGE ----
      const likeResults = await Promise.allSettled(
        likeItems.map((item: any) => AddLikeProduct(item)),
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
          }),
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

  const MergeCartQuantity = async (GuestCart: any[]) => {
    // Guest ProductQuantity In Cart
    if (!user?.id) return;

    const cartList = await CartProductList(user.id);
    const CartData = cartList?.data ?? [];

    const promises = GuestCart.map(async (guestItem) => {
      const cartItem = CartData.find(
        (c: any) => c.product.productId === guestItem.id,
      );

      if (!cartItem) return;
      return incrementCartProduct(cartItem.id, guestItem.quantity);
    });


    return await Promise.allSettled(promises);
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-white h-[62px]  lg:h-[72px] shadow-md">
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

          {/* MobileMenu */}
          <div
            className={`lg:hidden flex items-center ${searchOpen && "w-full"}  gap-4`}
          >
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
            <MobileMenuModal
              state={state}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              setStateModel={setLoginModel}
            />
          </div>

          {/* DesktopMenu */}
          <div className="hidden lg:flex">
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
              {searchOpen == false && (
                <Link
                  href="/collection"
                  className="flex items-center gap-2 relative text-gray-700 hover:text-black group"
                >
                  <LayoutGrid size={18} />
                  <span>All Collections</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all group-hover:w-full" />
                </Link>
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

              {user?.id !== null ? (
                <Link href={"/accountInfo"}>
                  <User
                    size={20}
                    className="text-gray-700 hover:text-black transition-colors cursor-pointer"
                  />
                </Link>
              ) : (
                <button
                  onClick={() =>
                    setLoginModel((prev) => ({ ...prev, LoginModel: true }))
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
        </div>
      </nav>

      {loginModel.LoginModel == true && (
        <MobileNumberLogin
          open={loginModel.LoginModel}
          onClose={() =>
            setLoginModel((prev) => ({ ...prev, LoginModel: false }))
          }
          onConfirm={(mobile, code) => {
            setMobileConfig((prev) => ({
              ...prev,
              mobileNumber: mobile,
              CountryCode: code,
            }));
            setLoginModel((prev) => ({ ...prev, OTPFillModel: true }));
          }}
        />
      )}

      {loginModel.OTPFillModel === true && (
        <OTPModal
          open={loginModel.OTPFillModel}
          mobileData={mobileConfig}
          onClose={() =>
            setLoginModel((prev) => ({ ...prev, OTPFillModel: false }))
          }
          onIfUserCreate={() =>
            setLoginModel((prev) => ({ ...prev, UserCreateModel: true }))
          }
        />
      )}

      {loginModel.UserCreateModel == true && (
        <UserCreateForm
          open={loginModel.UserCreateModel}
          mobileNumber={`${mobileConfig.CountryCode}${mobileConfig.mobileNumber}`}
          onClose={() =>
            setLoginModel((prev) => ({
              ...prev,
              UserCreateModel: false,
            }))
          }
        />
      )}
    </>
  );
}
