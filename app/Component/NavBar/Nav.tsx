"use client";
import { CiSearch } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { UsePanel } from "@/context/SerchPanelContext";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Nav() {
  const { cartProduct ,likeProduct} = UsePanel();
  const pathname = usePathname();
  return (
    <>
      <nav className="bg-ThemCharcoal p-2 py-5 w-full  sticky  top-0 z-10">
        <div className="flex flex-row items-center justify-between mx-3">
          {pathname !== "/Search" && (
            <div className="rounded-md ">
              <Link href={"/Search"}>
                <CiSearch
                  className="text-white cursor-pointer rounded-md hover:bg-white transition duration-700 ease-in-out hover:text-black"
                  size={25}
                />
              </Link>
            </div>
          )}

          <div>
            <Link
              href={"/"}
              id="LogoText"
              style={{ fontFamily: "ui-serif", fontWeight: 900 }}
              className="text-white text-xl cursor-pointer"
            >
              9RockeRoars
            </Link>
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
              <FcLike size={20} className=" cursor-pointer rounded-md " />
            </Link>

            <FaUser
              size={20}
              className="cursor-pointer rounded-md "
              color="white"
            />
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

              <FaShoppingCart
                size={23}
                className="cursor-pointer  rounded-md  text-white"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
