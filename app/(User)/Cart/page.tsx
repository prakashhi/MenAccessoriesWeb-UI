"use client";

import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import Image from "next/image";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/Context";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ItemCount from "./component/ItemCount";
import { motion, AnimatePresence } from "framer-motion";
import { getUserFromStorage } from "@/context/utils";
import { product } from "@/context/Types/type";
import { formatIndianPrice } from "@/app/utils/FormatCurrency";
import PaymentSuccessModal from "./component/PaymentSucessModel";
import { RiDeleteBinLine, RiShoppingCart2Line } from "react-icons/ri";
import PaymentFailedModal from "./component/PaymentFailedModel";
import GuestUserPaymentForm from "./component/GuestUserPaymentForm";
import CartInfoModal from "./component/CartInfoModel";
import {
  FiHeart,
  FiShoppingBag,
  FiX,
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";

import { useRouter } from "next/navigation";
import EmptyDataModel from "../Component/CommonComponet/EmptyDataModel";

export default function Page() {
  const user = useMemo(() => getUserFromStorage(), []);
  const { RemoveCartProduct, CartProductList, guestCart } = UsePanel();

  const [openCartInfo, setOpenCartInfo] = useState(false);

  const router = useRouter();

  const cartListData = useMemo(async () => {
    if (user) {
      let res = await CartProductList();
    }
    return Object.values(guestCart?.items || {});
  }, [user, guestCart]);

  const total = useMemo(() => {
    return (
      Array.isArray(cartListData) &&
      cartListData.reduce(
        (sum: number, item: any) => sum + item.sellingPrice * item.quantity,
        0
      )
    );
  }, [cartListData]);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate payment success

    if (!user) {
      setOpenCartInfo(true);
      return;
    }
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111]">
      <Nav />

      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto w-full">
        {/* TITLE */}
        {/* <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-2xl lg:text-4xl font-medium tracking-[0.3em] mb-14"
          style={{ fontFamily: "ui-serif, serif" }}
        >
          SHOPPING CART
        </motion.h1> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-2xl lg:text-4xl font-medium tracking-[0.3em] mb-8"
          style={{ fontFamily: "ui-serif, serif" }}
        >
          SHOPPING CART
        </motion.h1>
        <div className="w-24 h-px bg-neutral-300 mx-auto"></div>

        <div className="flex flex-col lg:flex-row gap-10 mt-24">
          {/* CART LIST */}
          <div className="flex-1  rounded-2xl ">
            <AnimatePresence>
              {cartListData.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="divide-y"
                >
                  {cartListData.map((item: any) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col sm:flex-row gap-6 p-6 items-start sm:items-center"
                    >
                      {/* IMAGE */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F2F2F2] shrink-0">
                        <Image
                          onClick={() => router.push(`/all-Product/${item.id}`)}
                          src={
                            `${process.env.NEXT_PUBLIC_IMG_URL}${
                              item?.image.split("/")[1]
                            }` || "/images/placeholder.webp"
                          }
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1 space-y-3">
                        <h3 className="text-sm sm:text-base font-medium tracking-wide">
                          {item.name}
                        </h3>

                        <ItemCount
                          productId={item.id}
                          quantity={item.quantity}
                          stock={item.stock}
                        />

                        <button
                          onClick={() => RemoveCartProduct(item.id)}
                          className="text-xs cursor-pointer tracking-widest text-gray-400 hover:text-black transition"
                        >
                          REMOVE
                        </button>
                      </div>

                      {/* PRICE */}
                      <div className="text-sm sm:text-base font-semibold">
                        ₹ {formatIndianPrice(item.sellingPrice)}.00
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <EmptyDataModel
                  message="Your Cart is Empty"
                  Icon={
                    <FiShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-neutral-400" />
                  }
                />
              )}
            </AnimatePresence>
          </div>

          {/* SUMMARY */}
          {total > 0 && (
            <motion.aside
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-[34%]"
            >
              <div className="bg-white rounded-xl border border-[#ECECEC] p-6 sticky top-24 space-y-6">
                <div className="flex justify-between text-sm tracking-wide">
                  <span>Total</span>
                  <span className="font-semibold">
                    ₹{formatIndianPrice(total)}.00
                  </span>
                </div>

                {/* DISCOUNT */}
                <div className="flex">
                  <input
                    placeholder="Discount code"
                    className="flex-1 border border-gray-300 px-4 py-3 text-sm outline-none"
                  />
                  <button className="px-5 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition">
                    APPLY
                  </button>
                </div>

                {/* CHECKOUT */}
                <Button
                  onPress={handleCheckout}
                  className="w-full cursor-pointer bg-black cur text-white py-4 text-xs tracking-[0.3em] hover:bg-neutral-900 transition"
                >
                  CHECKOUT
                </Button>
              </div>
            </motion.aside>
          )}
        </div>

        <CartInfoModal
          open={openCartInfo}
          onClose={() => setOpenCartInfo(false)}
          children={<GuestUserPaymentForm />}
        />
      </main>

      <Footer />
    </div>
  );
}
