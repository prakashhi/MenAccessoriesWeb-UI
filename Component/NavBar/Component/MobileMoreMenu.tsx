"use client";

import Link from "next/link";
import {
  Heart,
  User,
  ShoppingBag,
  MoreVertical,
  LayoutGrid,
} from "lucide-react";
import { UsePanel } from "@/context/Context";
import { length } from "../Nav";
export default function MobileMenuModal({
  state,
  setStateModel,
  setMobileMenuOpen,
  mobileMenuOpen,
}: {
  state: length;
  setStateModel: any;
  setMobileMenuOpen: any;
  mobileMenuOpen: boolean;
}) {
  const { userDataContext } = UsePanel();

  return (
    <>
      <Link
        href="/collection"
        className="flex items-center gap-2 relative text-gray-700 hover:text-black group"
      >
        <LayoutGrid size={18} />

        <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all group-hover:w-full" />
      </Link>
      <div className="relative">
        {/* Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen((prev: any) => !prev)}
          className="p-2 cursor-pointer rounded-full hover:bg-gray-100"
        >
          <MoreVertical size={20} className="text-gray-700" />
        </button>

        {/* Dropdown */}
        {mobileMenuOpen && (
          <div
            className="
    absolute right-0 mt-3 w-56
    rounded-2xl
    bg-white
    shadow-[0_20px_40px_rgba(0,0,0,0.12)]
    border border-gray-100
    z-50
    overflow-hidden
  "
          >
            {/* Wishlist */}
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="
      flex items-center justify-between
      px-4 py-3.5
      active:bg-gray-100
      transition
    "
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50">
                  <Heart size={18} className="text-red-500" />
                </span>
                <span className="text-sm font-medium text-gray-800">
                  Wishlist
                </span>
              </div>

              {state.likeProductLength > 0 && (
                <span className="text-[11px] font-semibold bg-red-500 text-white rounded-full px-2 py-0.5">
                  {state.likeProductLength}
                </span>
              )}
            </Link>

            {/* Divider */}
            <div className="h-px bg-gray-100 mx-4" />

            {/* Account / Login */}
            {userDataContext.info ? (
              <Link
                href="/accountInfo"
                onClick={() => setMobileMenuOpen(false)}
                className="
        flex items-center gap-3
        px-4 py-3.5
        active:bg-gray-100
        transition
      "
              >
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100">
                  <User size={18} className="text-gray-700" />
                </span>
                <span className="text-sm font-medium text-gray-800">
                  My Account
                </span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStateModel((prev: any) => ({
                    ...prev,
                    LoginModel: true,
                  }));
                }}
                className="
        w-full flex items-center gap-3
        px-4 py-3.5
        active:bg-gray-100
        transition text-left
      "
              >
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100">
                  <User size={18} className="text-gray-700" />
                </span>
                <span className="text-sm font-medium text-gray-800">Login</span>
              </button>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-100 mx-4" />

            {/* Cart */}
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="
      flex items-center justify-between
      px-4 py-3.5
      active:bg-gray-100
      transition
    "
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5">
                  <ShoppingBag size={18} className="text-black" />
                </span>
                <span className="text-sm font-medium text-gray-800">Cart</span>
              </div>

              {state.CartProductLength > 0 && (
                <span className="text-[11px] font-semibold bg-black text-white rounded-full px-2 py-0.5">
                  {state.CartProductLength}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
