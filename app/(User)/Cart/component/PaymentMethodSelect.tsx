import { useForm } from "react-hook-form";
import { Wallet, CreditCard } from "lucide-react";
import { X } from "lucide-react";

import Loader from "@/public/svg/tube-spinner.svg";
import Image from "next/image";
import { useApi } from "@/app/useApi";
import {
  CartItem,
  CartProductInfo,
  ProductInfoType,
  User,
} from "@/app/(User)/Type/Types";
import { getUserFromStorage } from "@/context/utils";
import { useMemo } from "react";

type PaymentMode = "CASH" | "ONLINE";

type GuestCartItem = ProductInfoType & { quantity?: number };

type CartListItem = GuestCartItem | CartItem;

export function PaymentModeSelector({
  onClose,
  cartListData,
  TotalPrice,
  PaymentAmount,
  tax,
  shipping,
}: {
  onClose: () => void;
  cartListData: CartListItem[];
  TotalPrice: number;
  PaymentAmount: number;
  tax: number;
  shipping: number;
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const user: User = useMemo(() => getUserFromStorage(), []);

  const selected = watch("paymentMode");
  const { callApi } = useApi();

  const generateOrderId = (type: string) => {
    return `${type}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
  };

  const onSubmit = async (info) => {
    if (info.paymentMode == "CASH") {
      console.log(cartListData);

      let date = new Date().toISOString();
      let res = await callApi("post", "/sales", {
        data: {
          sales: {
            salesDate: date,
            invoiceId: generateOrderId("INVOICE"),
            orderId: generateOrderId("ORD"),
            totalPrice: TotalPrice,
            totalQuantity: cartListData.length,
            totalDiscount: 0,
            totalTax: tax,
            shippingFee: shipping,
            salesStatus: "PENDING",
            source: "OFFLINE",
          },
          products: [
            {
              productId: "string",
              productName: "string",
              productCategory: "string",
              productSerialNumber: "string",
              productImage: "string",
              productHSNCode: "string",
              quantity: 0,
              price: 0,
              totalPrice: 0,
              variantSize: "string",
            },
          ],
          payments: {
            transactionId: generateOrderId("TRAN"),
            paymentMethod: "CASH",
            paymentStatus: "PENDING",
            paymentAmount: PaymentAmount,
            razorpayOrderId: null,
            razorpayPaymentId: null,
            razorpaySignature: null,
            paymentDate: date,
          },
          customer: {
            customerType: "RETAIL_CUSTOMER",
            customerName: user.userName,
            customerEmail: user.email,
            customerPhone: user.contactNumber,
            customerAddress: user.address,
            customerState: user.state,
            customerPinCode: user.pinCode,
            customerCountry: user.country,
            customerCountryCode: user.countryCode,
            customerId: user.id,
            customerGSTIN: null,
            customerGSTAddress: null,
          },
          shouldSendEmail: true,
          shouldMinimizeStock: true,
        },
      });

      console.log(res);
    }
  };

  console.log("isDirty", isDirty);

  return (
    <>
      <div className="relative w-full">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
        absolute top-4 right-4
        flex items-center cursor-pointer justify-center
        w-9 h-9
        rounded-full
        bg-gray-100/70
        text-gray-600
        hover:bg-gray-200
        hover:text-gray-900
        active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-300
      "
        >
          <X size={18} />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-5">
            <h3 className="text-base font-semibold text-gray-900">
              Payment Method
            </h3>

            {/* CASH ON DELIVERY */}
            <label
              className={`relative flex gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200
          border
          ${
            selected === "COD"
              ? "border-gray-300 bg-gray-50 ring-1 ring-gray-200"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/40"
          }`}
            >
              <input
                type="radio"
                value="CASH"
                {...register("paymentMode", { required: true })}
                className="absolute top-5 right-5 h-4 w-4 accent-black"
              />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <Wallet size={18} className="text-gray-700" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Cash on Delivery
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pay when your order arrives
                </p>
              </div>
            </label>

            {/* ONLINE PAYMENT */}
            <label
              className={`relative flex gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200
          border
          ${
            selected === "ONLINE"
              ? "border-gray-300 bg-gray-50 ring-1 ring-gray-200"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/40"
          }`}
            >
              <input
                type="radio"
                value="ONLINE"
                {...register("paymentMode", { required: true })}
                className="absolute top-5 right-5 h-4 w-4 accent-black"
              />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <CreditCard size={18} className="text-gray-700" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Online Payment
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  UPI, Cards, Net Banking
                </p>
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !selected}
              className={`
    w-full h-12 flex items-center justify-center rounded-xl
    text-sm font-medium text-white transition-all
    ${
      isSubmitting || !selected
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-black hover:bg-black/90 cursor-pointer"
    }
  `}
            >
              {isSubmitting ? (
                <Image src={Loader} alt="loading" width={22} height={22} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
