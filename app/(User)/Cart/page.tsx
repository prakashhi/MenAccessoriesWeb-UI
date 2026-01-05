"use client";

import Nav from "@/Component/NavBar/Nav";
import Footer from "@/Component/Footer/Footer";
import Image from "next/image";
import { Button, image } from "@heroui/react";
import { UsePanel } from "@/context/Context";
import { useEffect, useMemo, useState } from "react";

import ItemCount from "./component/ItemCount";
import { motion, AnimatePresence } from "framer-motion";
import { getUserFromStorage } from "@/context/utils";
import { formatIndianPrice, PriceShowFunction } from "@/utils/FormatCurrency";
import PaymentSuccessModal from "./component/PaymentSuccessModel";
import PaymentFailedModal from "./component/PaymentFailedModel";
import GuestUserPaymentForm from "./component/GuestUserFill";
import CartInfoModal from "./component/CartInfoModel";

import { FiShoppingBag } from "react-icons/fi";

import { useRouter } from "next/navigation";
import EmptyDataModel from "@/Component/CommonComponet/EmptyDataModel";
import { ImageShowUtil } from "@/utils/ImageShowUtil";

import { CartItem } from "@/Type/CartType";
import { ProductInfoType } from "@/Type/ProductType";

import { User } from "@/Type/UserDetailType";
import { useApi } from "@/app/useApi";
import { PaymentModeSelector } from "./component/PaymentMethodSelect";

import { notify, toastActions } from "@/Component/ToastComponent";
import { PriceTable } from "./component/PriceTable";
import { useUserCart } from "@/context/UserCartContext";
import { useGuestUser } from "@/context/GuestUserContext";
import CartProductShowModel from "./component/CartProductShowModel";

type GuestCartItem = ProductInfoType & { quantity?: number };

type CartListItem = GuestCartItem | CartItem;

type modelTypes = {
  FillForm: boolean;
  PaymentMethodModel: boolean;
  PaymentSuccessModel: boolean;
  PaymentFailModel: boolean;
};

export default function Page() {
  const user = useMemo(() => getUserFromStorage(), []);

  console.log(user);

  const { setUserCountData } = UsePanel();

  const { CartProductList, RemoveCartProduct } = useUserCart();

  const { guestCart, RemoveGuestCartProduct } = useGuestUser();

  const [openModel, setOpenModel] = useState<modelTypes>({
    FillForm: false,
    PaymentMethodModel: false,
    PaymentSuccessModel: false,
    PaymentFailModel: false,
  });

  const [cartListData, setCartListData] = useState<CartListItem[]>([]);
  const [Fields, setFields] = useState<string[]>([]);
  const [paymentData, setPaymentData] = useState<any>(null);

  const { callApi } = useApi();

  const router = useRouter();

  const ShippingCharge = 900;
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
  }, [user]);

  useEffect(() => {
    if (user) return;
    setCartListData(Object.values(guestCart.items));
  }, [guestCart]);

  const sample = {
    id: "50c35f0c-8e7d-497e-9f74-f0e538d7241d",
    customerType: "RETAIL_CUSTOMER",
    customerName: "Prakash Prajapati",
    customerEmail: "prakash398prajapati@gmail.com",
    customerPhone: "9234567890",
    customerAddress: "LODARA",
    customerGSTAddress: null,
    customerState: "Gujarat",
    customerPinCode: "476576869",
    customerCountry: "India",
    customerCountryCode: "+91",
    totalPrice: 1431,
    totalQuantity: 1,
    totalDiscount: 0,
    totalTax: 41,
    shippingFee: 900,
    customerId: "67a91bce-5665-4d5d-909c-6349c3e761b9",
    customerGSTIN: null,
    address: null,
    contactNumber: null,
    countryCode: null,
    country: null,
    state: null,
    invoiceId: "INVOICE-1767185450449-JHT3",
    orderId: "ORD-1767185450449-2P8X",
    salesDate: "2025-12-31T12:50:50.449Z",
    salesStatus: "PENDING",
    source: "OFFLINE",
    createdAt: "2025-12-31T12:50:48.642Z",
    updatedAt: "2025-12-31T12:50:48.642Z",
    deletedAt: null,
    products: [
      {
        id: "daab7c48-588c-4949-bfad-e8a802d118d4",
        salesId: "50c35f0c-8e7d-497e-9f74-f0e538d7241d",
        productId: "f69b9625-d945-48be-917f-3085c8308a93",
        productName: "",
        productCategory: "Buttons",
        productSerialNumber: "B0BK4194",
        productImage: "/1765349675079-1000067030.jpg/",
        productHSNCode: "",
        quantity: 1,
        weight: null,
        price: 490,
        variantSize: null,
        totalPrice: 490,
        createdAt: "2025-12-31T12:50:48.642Z",
        updatedAt: "2025-12-31T12:50:48.642Z",
        deletedAt: null,
      },
    ],
    payments: [
      {
        id: "5ed9e8b3-b8d9-40e7-a9eb-3702685eb4a0",
        transactionId: "TRAN-1767185450449-ONMV",
        salesId: "50c35f0c-8e7d-497e-9f74-f0e538d7241d",
        paymentDate: "2025-12-31T12:50:50.449Z",
        paymentMethod: "CASH",
        paymentStatus: "PENDING",
        paymentAmount: 1431,
        createdAt: "2025-12-31T12:50:48.642Z",
        razorpayOrderId: "",
        razorpayPaymentId: "",
        razorpaySignature: "",
        updatedAt: "2025-12-31T12:50:48.642Z",
        deletedAt: null,
      },
    ],
  };

  // const total: number = useMemo(() => {
  //   if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

  //   if (user) {
  //     return cartListData.reduce(
  //       (sum: number, item: any) =>
  //         sum + Number(item.product?.productPrice) * 10 * Number(item.quantity),
  //       0
  //     );
  //   } else {
  //     return cartListData.reduce(
  //       (sum: number, item: any) =>
  //         sum + Number(item.sellingPrice) * item.quantity,
  //       0
  //     );
  //   }
  // }, [cartListData, user]);

  const TotalQty: number = useMemo(() => {
    if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

    return cartListData.reduce(
      (sum: number, item: any) => sum + Number(item.quantity),
      0
    );
  }, [cartListData]);

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

  const ShippingTaxFunction: number = useMemo(() => {
    let Total = total + ShippingCharge + (total + ShippingCharge) * (3 / 100);
    return Total;
  }, [total]);

  const valueCheckUser: (keyof User)[] = [
    "contactNumber",
    "country",
    "state",
    "address",
    "pinCode",
  ];

  const userDataCheck = (user: User) => {
    return valueCheckUser.filter((field) => {
      const value = user[field];

      return (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      );
    });
  };

  const handleCheckout = async () => {
    try {
      if (!user || !user.id) {
        router.push("/login");
      } else {
        let res = await callApi("get", `/user/${user.id}`);
        let isCheck = userDataCheck(res.data);

        if (isCheck.length > 0) {
          setFields(isCheck);
          setOpenModel((prev) => ({
            ...prev,
            FillForm: true,
            PaymentMethodModel: false,
            PaymentSuccessModel: false,
            PaymentFailModel: false,
          }));
        } else {
          setOpenModel((prev) => ({
            ...prev,
            PaymentMethodModel: true,
            // PaymentFailModel: true,
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("cartListData", cartListData);

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
  my-4"
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
            <motion.aside
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-[34%]"
            >
              <div className="bg-white rounded-xl border border-[#ECECEC] p-6 sticky top-24 space-y-4">
                <div className="flex justify-between text-sm tracking-wide">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{formatIndianPrice(total)}.00
                  </span>
                </div>
                <div className="flex justify-between text-sm tracking-wide">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    ₹{formatIndianPrice(ShippingCharge)}.00
                  </span>
                </div>
                <div className="flex justify-between text-sm tracking-wide">
                  <span>Tax</span>
                  <span className="font-semibold text-sm">
                    ₹
                    {Math.floor(
                      ((total + ShippingCharge) * TaxPercentage) / 100
                    )}
                    .00
                    {/* ({`${TaxPercentage}%`}) */}
                  </span>
                </div>

                <div className="border-b-1 border-gray-400"></div>
                <div className="flex justify-between text-sm tracking-wide">
                  <span>Total</span>
                  <span className="font-semibold">
                    ₹{formatIndianPrice(ShippingTaxFunction)}.00
                  </span>
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

        {openModel.FillForm === true && (
          <CartInfoModal
            open={openModel.FillForm}
            onClose={() =>
              setOpenModel((prev) => ({ ...prev, FillForm: false }))
            }
            children={
              <GuestUserPaymentForm
                requiredFields={Fields}
                onClose={() =>
                  setOpenModel((prev) => ({ ...prev, FillForm: false }))
                }
                onSuccess={() =>
                  setOpenModel({
                    FillForm: false,
                    PaymentMethodModel: true,
                    PaymentSuccessModel: false,
                    PaymentFailModel: false,
                  })
                }
                UserData={user}
              />
            }
          />
        )}

        {openModel.PaymentMethodModel === true && (
          <CartInfoModal
            open={openModel.PaymentMethodModel}
            onClose={() =>
              setOpenModel((prev) => ({ ...prev, PaymentMethodModel: false }))
            }
            children={
              <PaymentModeSelector
                cartListData={cartListData}
                TotalPrice={total}
                TotalQty={TotalQty}
                PaymentAmount={ShippingTaxFunction}
                tax={TaxPercentage}
                shipping={ShippingCharge}
                onSuccess={() =>
                  setOpenModel({
                    FillForm: false,
                    PaymentMethodModel: false,
                    PaymentSuccessModel: true,
                    PaymentFailModel: false,
                  })
                }
                setPaymentData={setPaymentData}
                onFail={() =>
                  setOpenModel({
                    FillForm: false,
                    PaymentMethodModel: false,
                    PaymentSuccessModel: false,
                    PaymentFailModel: true,
                  })
                }
                onClose={() =>
                  setOpenModel((prev) => ({
                    ...prev,
                    PaymentMethodModel: false,
                  }))
                }
              />
            }
          />
        )}

        {openModel.PaymentSuccessModel === true && (
          <CartInfoModal
            open={openModel.PaymentSuccessModel}
            onClose={() =>
              setOpenModel((prev) => ({ ...prev, PaymentSuccessModel: false }))
            }
            children={
              <PaymentSuccessModal
                PaymentData={sample}
                onClose={() =>
                  setOpenModel((prev) => ({
                    ...prev,
                    PaymentSuccessModel: false,
                  }))
                }
              />
            }
          />
        )}

        {openModel.PaymentFailModel === true && (
          <CartInfoModal
            open={openModel.PaymentFailModel}
            onClose={() =>
              setOpenModel((prev) => ({ ...prev, PaymentFailModel: false }))
            }
            children={
              <PaymentFailedModal
                onClose={() =>
                  setOpenModel((prev) => ({
                    ...prev,
                    PaymentFailModel: false,
                  }))
                }
                //reason={"This is reason"}
              />
            }
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
