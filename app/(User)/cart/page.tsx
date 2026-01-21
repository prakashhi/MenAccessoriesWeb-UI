"use client";

import Nav from "@/Component/NavBar/Nav";
import Footer from "@/Component/Footer/Footer";
import { UsePanel } from "@/context/Context";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import EmptyDataModel from "@/Component/CommonComponet/EmptyDataModel";
import { CartItem } from "@/Type/CartType";
import { ProductInfoType } from "@/Type/ProductType";

import { useUserCart } from "@/context/UserCartContext";
import { useGuestUser } from "@/context/GuestUserContext";
import CartProductShowModel from "./component/CartProductShowModel";
import { TotalSummaryModel } from "./component/TotalSummaryModel";
import { PriceShowFunction } from "@/utils/FormatCurrency";
import SkelatonCart from "@/app/(User)/cart/component/SkelatonCart";

type GuestCartItem = ProductInfoType & { quantity?: number };

export type CartListItem = GuestCartItem | CartItem;



export default function Page() {
  const {
    setUserCountData,
    refreshKey,
    userDataContext,
    loading,
  } = UsePanel();
  const user = userDataContext.info;

  const { CartProductList } = useUserCart();
  const { guestCart, GuestCartProductStockCheck } = useGuestUser();

  const [cartListData, setCartListData] = useState<CartListItem[]>([]);

  const [isEmptyStock, seIsEmptyStock] = useState(false);

  const TaxPercentage = 3;

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
  }, [user?.id, refreshKey]);

  useEffect(() => {
    let value =
      cartListData.filter((val: any) =>
        user ? val?.product?.stock <= 0 : val.stock <= 0,
      ).length > 0
        ? true
        : false;

    seIsEmptyStock(value);
  }, [cartListData]);

  useEffect(() => {
    if (user) return;

    setCartListData(Object.values(guestCart.items));
  }, [guestCart]);


  useEffect(() => {
    if (guestCart) {
      GuestCartProductStockCheck(guestCart);
    }
  }, []);


  const total: number = useMemo(() => {
    if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

    return cartListData.reduce((sum: number, item: any) => {
      const stock = user ? item.product?.stock : item.stock;

      if (!stock || stock === 0) return sum; // ❌ exclude out-of-stock

      const price =
        user && item?.product?.productPrice
          ? Number(item.product?.productPrice)
          : Number(PriceShowFunction(item.code, item.sellingPrice, 1, true));

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
  max-h-[75vh] py-2
  sm:max-h-none
  "
          >
            <AnimatePresence>
              {loading && cartListData.length === 0 ? (
                <SkelatonCart />
              ) : cartListData.length > 0 ? (
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
              isEmptyStock={isEmptyStock}
              subTotal={total}
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
