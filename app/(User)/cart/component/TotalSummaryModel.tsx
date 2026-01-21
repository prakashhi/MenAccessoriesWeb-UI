import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useMemo, useState } from "react";
import { getUserFromStorage } from "@/context/utils";
import PaymentSuccessModal from "@/app/(User)/cart/component/PaymentComponent/PaymentSuccessModel";
import PaymentFailedModal from "@/app/(User)/cart/component/PaymentComponent/PaymentFailedModel";
import CartInfoModal from "../component/CartInfoModel";
import Image from "next/image";
import { formatIndianPrice } from "@/utils/FormatCurrency";
import { notify } from "@/Component/ToastComponent";
import { UsePanel } from "@/context/Context";
import { CartListItem } from "../page";
import { PaymentAddressSelect } from "@/app/(User)/cart/component/PaymentComponent/PaymentAddressSelect";
import { CartItem } from "@/Type/CartType";
import { ProductInfoType } from "@/Type/ProductType";
import { calculateShippingCharge } from "@/utils/shippingFees";
import { CreateSaleProductListType } from "@/Type/UserDetailType";
import Loader from "@/public/svg/tube-spinner.svg";
import { ProductsListAPi } from "@/Type/ProductType";
import { useRouter } from "next/navigation";
import { useGuestUser } from "@/context/GuestUserContext";
import { useRazorpayPayment } from "../util/razorPayFunction";

export const TotalSummaryModel = ({
  subTotal,
  TaxPercentage,
  isEmptyStock,
  cartListData,
}: {
  subTotal: number;
  TaxPercentage: number;
  isEmptyStock: boolean;
  cartListData: CartListItem[];
}) => {
  // Type
  type GuestCartItem = ProductInfoType & { quantity?: number };
  type CartListItem = GuestCartItem | CartItem;

  const { handleRazorpayPayment } = useRazorpayPayment();

  //Functions
  const user = useMemo(() => getUserFromStorage(), []);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { setLoginModel, userDataContext ,openModel,setOpenModel} = UsePanel();
  // const [paymentData, setPaymentData] = useState<any>(null);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const { GuestCartProductStockCheck, guestCart } = useGuestUser();

  const ShippingCharge: number = useMemo(() => {
    return calculateShippingCharge(
      subTotal,
      userDataContext.AddressList[selectedAddressIndex]?.country || "INDIA",
    );
  }, [subTotal, selectedAddressIndex]);

  const ShippingWithTax: number = useMemo(() => {
    let Total =
      subTotal + ShippingCharge + (subTotal + ShippingCharge) * (3 / 100);
    return Total;
  }, [subTotal, selectedAddressIndex]);

  const TotalQty: number = useMemo(() => {
    if (!Array.isArray(cartListData) || cartListData.length === 0) return 0;

    return cartListData.reduce(
      (sum: number, item: any) => sum + Number(item.quantity),
      0,
    );
  }, [cartListData]);


  const AddressSelect = () => {
    setOpenModel((prev) => ({ ...prev, PaymentAddressSelect: true }));
  };

  let List = cartListData as CartItem[];
  const productsList: CreateSaleProductListType[] = List.reduce((acc, val) => {
    const { product, quantity, variantSize } = val;
    if (!product || quantity <= 0) return acc;
    const price = Number(product.productPrice);
    acc.push({
      productId: product.productId,
      productName: product.productName,
      productCategory: product.categoryName,
      productSerialNumber: product.serialNumber,
      productImage: product.productImage,
      productHSNCode: null,
      quantity,
      price,
      totalPrice: quantity * price,
      variantSize: variantSize?.variantSizeName ?? null,
    });

    return acc;
  }, [] as ProductsListAPi[]);

  const handleSaleCreate = async () => {
    setLoading(true);
    try {
      let saleConfigObj = {
        TotalAmount: Math.ceil(ShippingWithTax),
        TotalProductQty: TotalQty,
        TotalTax: Math.ceil(
          ((subTotal + ShippingCharge) * TaxPercentage) / 100,
        ),
        shippingFee: ShippingCharge,
        OrderProductList: productsList,
        customerName: `${userDataContext.info?.userFirstName} ${userDataContext.info?.userLastName} `,
        customerAddress: `${userDataContext.AddressList[selectedAddressIndex].addressLine1}  ${userDataContext.AddressList[selectedAddressIndex].addressLine2}`,
        customerState: userDataContext.AddressList[selectedAddressIndex].state,
        customerPinCode:
          userDataContext.AddressList[selectedAddressIndex].pinCode,
        customerCountry:
          userDataContext.AddressList[selectedAddressIndex].country,
        customerCountryCode:
          userDataContext.AddressList[selectedAddressIndex].countryCode,
        customerId: userDataContext?.info && userDataContext.info.id,
        customerEmail: userDataContext.AddressList[selectedAddressIndex].email,
        customerPhone:
          userDataContext.AddressList[selectedAddressIndex].contactNumber,
      };
      let response = await handleRazorpayPayment(saleConfigObj);

      console.log("responseAll", response);
    } catch (error: any) {
      notify({
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!user || !user.id) {
        GuestCartProductStockCheck(guestCart);
        setLoginModel((prev) => ({ ...prev, LoginModel: true }));
      } else {
        handleSaleCreate();
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
          {/* Subtotal */}
          <div className="flex justify-between text-sm tracking-wide">
            <span>Subtotal</span>
            <span className="font-semibold">
              ₹{formatIndianPrice(subTotal)}.00
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm tracking-wide">
            <span>Shipping</span>
            <span className="font-semibold">
              ₹
              {calculateShippingCharge(
                subTotal,
                userDataContext.AddressList[selectedAddressIndex]?.country ||
                  "INDIA",
              )}
              .00
            </span>
          </div>

          {/* Default Shipping Address with Change button */}
          {userDataContext.info &&
            (userDataContext.AddressList.length > 0 ? (
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                {/* Address */}
                <div className="text-xs text-gray-700 leading-relaxed wrap-break-words sm:max-w-[75%]">
                  <p className="font-bold">Shipping address</p>
                  {userDataContext.AddressList?.[selectedAddressIndex] ? (
                    <p className="line-clamp-2">
                      {`${
                        userDataContext.AddressList[selectedAddressIndex]
                          ?.addressLine1
                      }, 
        ${
          userDataContext.AddressList[selectedAddressIndex]?.addressLine2 ?? ""
        } 
        ${userDataContext.AddressList[selectedAddressIndex]?.city}, 
        ${userDataContext.AddressList[selectedAddressIndex]?.state}, 
        ${userDataContext.AddressList[selectedAddressIndex]?.country}`}
                    </p>
                  ) : (
                    <span className="text-gray-400">
                      No default shipping address
                    </span>
                  )}
                </div>

                {/* Change Button */}
                <div className="flex justify-end sm:justify-start">
                  <Button
                    onPress={AddressSelect}
                    className="text-blue-600 text-xs font-medium px-2 py-1 hover:underline whitespace-nowrap"
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                onPress={() => {
                  router.push("/accountInfo?tab=Addresses");
                  localStorage.setItem("postLoginRedirect", "/cart");
                }}
                className="
    w-full h-11 rounded-xl
    border border-dashed border-gray-300
    bg-white
    text-sm font-semibold
    text-gray-800
    hover:border-gray-900 hover:text-gray-900
    hover:bg-gray-50
    active:scale-95
    transition-all duration-200
  "
              >
                + Add Delivery Address
              </Button>
            ))}

          {/* Tax */}
          <div className="flex justify-between text-sm tracking-wide">
            <span>Tax</span>
            <span className="font-semibold text-sm">
              ₹{Math.ceil(((subTotal + ShippingCharge) * TaxPercentage) / 100)}
              .00
            </span>
          </div>

          <div className="border-b border-gray-300"></div>

          {/* Total */}
          <div className="flex justify-between text-sm tracking-wide">
            <span>Total</span>
            <span className="font-semibold">
              ₹{formatIndianPrice(ShippingWithTax)}.00
            </span>
          </div>

          {/* Checkout */}
          {isEmptyStock ||
          (userDataContext.AddressList.length <= 0 && userDataContext.info) ? (
            <Button
              onPress={() => {
                let msg = isEmptyStock
                  ? "Remove Out of stock Product"
                  : "Please Add Your Address";
                notify({
                  message: msg,
                  type: "warning",
                });
              }}
              className="w-full bg-gray-400 text-white py-4 text-xs tracking-[0.3em] cursor-not-allowed transition"
            >
              CHECKOUT
            </Button>
          ) : (
            <Button
              onPress={handleCheckout}
              className="w-full bg-black text-white py-4 text-xs tracking-[0.3em] hover:bg-neutral-900 transition"
            >
              {loading ? (
                <Image width={20} height={20} alt="Loading" src={Loader} />
              ) : (
                "Continue"
              )}
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
              setSelectedAddressIndex={(index: number) =>
                setSelectedAddressIndex(index)
              }
              selectedAddressIndex={selectedAddressIndex}
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
