import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { useMemo, useState } from "react";
import { getUserFromStorage } from "@/context/utils";

import PaymentSuccessModal from "@/app/(User)/cart/component/PaymentComponent/PaymentSuccessModel";
import PaymentFailedModal from "@/app/(User)/cart/component/PaymentComponent/PaymentFailedModel";
import CartInfoModal from "../component/CartInfoModel";

import { formatIndianPrice } from "@/utils/FormatCurrency";
import { notify } from "@/Component/ToastComponent";
import { UsePanel } from "@/context/Context";
import { CartListItem } from "../page";
import { PaymentAddressSelect } from "@/app/(User)/cart/component/PaymentComponent/PaymentAddressSelect";
import { modelTypes } from "../page";

export const TotalSummaryModel = ({
  ShippingCharge,
  subTotal,
  TaxPercentage,
  isEmptyStock,
  openModel,
  setOpenModel,
  cartListData,
}: {
  ShippingCharge: number;
  subTotal: number;
  TaxPercentage: number;
  isEmptyStock: boolean;
  openModel: modelTypes;
  setOpenModel: React.Dispatch<React.SetStateAction<modelTypes>>;
  cartListData: CartListItem[];
}) => {
  const user = useMemo(() => getUserFromStorage(), []);

  const { loginModel, setLoginModel } = UsePanel();
  const [paymentData, setPaymentData] = useState<any>(null);

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

  const ShippingTax: number = useMemo(() => {
    let Total =
      subTotal + ShippingCharge + (subTotal + ShippingCharge) * (3 / 100);
    return Total;
  }, [subTotal]);

  const TotalQty: number = useMemo(() => {
    if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

    return cartListData.reduce(
      (sum: number, item: any) => sum + Number(item.quantity),
      0
    );
  }, [cartListData]);

  const PaymentSuccess = () => {
    setOpenModel((prev) => ({ ...prev, PaymentSuccessModel: true }));
  };

  const PaymentFail = () => {
    setOpenModel((prev) => ({ ...prev, PaymentFailModel: true }));
  };

  const AddressSelect = () => {
    setOpenModel((prev) => ({ ...prev, PaymentAddressSelect: true }));
  };

  const handleCheckout = async () => {
    try {
      if (!user || !user.id) {
        setLoginModel((prev) => ({ ...prev, LoginModel: true }));
      } else {
        AddressSelect();
        //PaymentSuccess();
        //PaymentFail();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full lg:w-[34%]"
      >
        <div className="bg-white rounded-xl border border-[#ECECEC] p-6 sticky top-24 space-y-4">
          <div className="flex justify-between text-sm tracking-wide">
            <span>Subtotal</span>
            <span className="font-semibold">
              ₹{formatIndianPrice(subTotal)}.00
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
              ₹{Math.ceil(((subTotal + ShippingCharge) * TaxPercentage) / 100)}
              .00
              {/* ({`${TaxPercentage}%`}) */}
            </span>
          </div>

          <div className="border-b-1 border-gray-400"></div>
          <div className="flex justify-between text-sm tracking-wide">
            <span>Total</span>
            <span className="font-semibold">
              ₹{formatIndianPrice(ShippingTax)}.00
            </span>
          </div>

          {/* CHECKOUT */}
          {isEmptyStock == true ? (
            <Button
              onPress={() =>
                notify({
                  message: "Remove Out of stock Product",
                  type: "warning",
                })
              }
              className="w-full  bg-gray-400 cur text-white py-4 text-xs tracking-[0.3em] cursor-not-allowed transition"
            >
              CHECKOUT
            </Button>
          ) : (
            <Button
              onPress={handleCheckout}
              className="w-full cursor-pointer bg-black cur text-white py-4 text-xs tracking-[0.3em] hover:bg-neutral-900 transition"
            >
              CHECKOUT
            </Button>
          )}
        </div>
      </motion.aside>

      {openModel.PaymentAddressSelect === true && (
        <CartInfoModal
          open={openModel.PaymentAddressSelect}
          onClose={() =>
            setOpenModel((prev) => ({ ...prev, PaymentAddressSelect: false }))
          }
          children={
            <PaymentAddressSelect
              cartListData={cartListData}
              subTotal={ShippingTax}
              TotalQty={TotalQty}
              TaxCal={Math.ceil(
                ((subTotal + ShippingCharge) * TaxPercentage) / 100
              )}
              ShippingFee={ShippingCharge}
              onSuccess={() =>
                setOpenModel({
                  PaymentAddressSelect: false,
                  PaymentSuccessModel: true,
                  PaymentFailModel: false,
                })
              }
              setPaymentData={setPaymentData}
              onFail={() =>
                setOpenModel({
                  PaymentAddressSelect: false,
                  PaymentSuccessModel: false,
                  PaymentFailModel: true,
                })
              }
              onClose={() =>
                setOpenModel((prev) => ({
                  ...prev,
                  PaymentAddressSelect: false,
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
              PaymentData={paymentData}
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
    </>
  );
};
