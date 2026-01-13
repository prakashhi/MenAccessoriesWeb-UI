"use client";

import Nav from "@/Component/NavBar/Nav";
import Footer from "@/Component/Footer/Footer";
import { UsePanel } from "@/context/Context";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserFromStorage } from "@/context/utils";
import { FiShoppingBag } from "react-icons/fi";
import EmptyDataModel from "@/Component/CommonComponet/EmptyDataModel";
import { CartItem } from "@/Type/CartType";
import { ProductInfoType } from "@/Type/ProductType";

import { useUserCart } from "@/context/UserCartContext";
import { useGuestUser } from "@/context/GuestUserContext";
import CartProductShowModel from "./component/CartProductShowModel";
import { TotalSummaryModel } from "./component/TotalSummaryModel";

type GuestCartItem = ProductInfoType & { quantity?: number };

export type CartListItem = GuestCartItem | CartItem;

export type modelTypes = {
  PaymentAddressSelect: boolean;
  PaymentSuccessModel: boolean;
  PaymentFailModel: boolean;
};

export default function Page() {
  const user = useMemo(() => getUserFromStorage(), []);
  const { setUserCountData, refreshKey } = UsePanel();

  const { CartProductList } = useUserCart();
  const { guestCart } = useGuestUser();

  const [cartListData, setCartListData] = useState<CartListItem[]>([]);

  const [isEmptyStock, seIsEmptyStock] = useState(false);

  const ShippingCharge = 900;
  const TaxPercentage = 3;

  const [openModel, setOpenModel] = useState<modelTypes>({
    PaymentAddressSelect: false,
    PaymentSuccessModel: false,
    PaymentFailModel: false,
  });

  useEffect(() => {
    if (!user) return;
    const CartList = async () => {
      try {
        let response = await CartProductList(user.id);
        let Data = response.data ?? [];
        setCartListData(Data);
        setUserCountData((prev: any) => ({
          ...prev,
          CartCount: response?.data?.length,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    CartList();
  }, [user,refreshKey]);

  useEffect(() => {
    let value =
      cartListData.filter((val: any) => val?.product?.stock <= 0).length > 0
        ? true
        : false;

    seIsEmptyStock(value);
  }, [cartListData]);

  useEffect(() => {
    if (user) return;
    setCartListData(Object.values(guestCart.items));
  }, [guestCart]);

  // const TotalQty: number = useMemo(() => {
  //   if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

  //   return cartListData.reduce(
  //     (sum: number, item: any) => sum + Number(item.quantity),
  //     0
  //   );
  // }, [cartListData]);

  const total: number = useMemo(() => {
    if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

    return cartListData.reduce((sum: number, item: any) => {
      const stock = user ? item.product?.stock : item.stock;

      if (!stock || stock === 0) return sum; // ❌ exclude out-of-stock

      const price =
        user && item?.product?.productPrice
          ? Number(item.product?.productPrice) * 10
          : Number(item.sellingPrice);

      return sum + price * Number(item.quantity);
    }, 0);
  }, [cartListData, user]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111]">
      <Nav />

      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto w-full">
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

        <div className="flex flex-col lg:flex-row gap-10 mt-14">
          {/* CART LIST */}
          <div
            className=" flex-1 scroll-m-0
  overflow-y-auto 
  max-h-[70vh]
  sm:max-h-none
  "
          >
            <AnimatePresence>
              {cartListData.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {cartListData &&
                    cartListData.map((item: any, index: number) => (
                      <CartProductShowModel
                        key={index}
                        item={item}
                        index={index}
                        user={user}
                        setCartListData={setCartListData}
                      />
                    ))}
                </motion.div>
              ) : (
                <EmptyDataModel
                  message="Your Cart is Empty"
                  Icon={
                    <FiShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-neutral-300" />
                  }
                />
              )}
            </AnimatePresence>
          </div>

          {/* SUMMARY */}
          {total > 0 && (
            <TotalSummaryModel
              openModel={openModel}
              setOpenModel={setOpenModel}
              isEmptyStock={isEmptyStock}
              subTotal={total}
              ShippingCharge={ShippingCharge}
              TaxPercentage={TaxPercentage}
              cartListData={cartListData}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
