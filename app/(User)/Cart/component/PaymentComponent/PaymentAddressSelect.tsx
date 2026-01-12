import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { CartItem } from "@/Type/CartType";

import { CreateSaleProductListType } from "@/Type/UserDetailType";

import { ProductInfoType } from "@/Type/ProductType";
import { useState } from "react";

import { UsePanel } from "@/context/Context";
import CreateEditConfigAddressForm from "@/app/(User)/accountInfo/Component/AddressComponent/CreateEditConfigAddressForm";
import { Button } from "@heroui/react";
import { notify } from "@/Component/ToastComponent";
import Image from "next/image";
import Loader from "@/public/svg/tube-spinner.svg";

type GuestCartItem = ProductInfoType & { quantity?: number };
type CartListItem = GuestCartItem | CartItem;

type ProductsListAPi = {
  productId: string;
  productName: string;
  productCategory: string;
  productSerialNumber: string;
  productImage: string;
  productHSNCode: string | null;
  quantity: number;
  price: number;
  totalPrice: number;
  variantSize: string;
};

export function PaymentAddressSelect({
  onClose,
  cartListData,
  subTotal,
  onSuccess,
  ShippingFee,
  TotalQty,
  setPaymentData,
  onFail,
  TaxCal,
}: {
  onClose: () => void;
  cartListData: CartListItem[];
  subTotal: number;
  setPaymentData: React.Dispatch<React.SetStateAction<any>>;
  onSuccess: () => void;
  onFail: () => void;
  TotalQty: number;
  ShippingFee: number;
  TaxCal: number;
}) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);

  const { userDataContext, createSalesFunction, loading } = UsePanel();

  const [stateModel, setStateModel] = useState({
    CreateAddress: false,
  });

  let List = cartListData as CartItem[];
  const productsList: CreateSaleProductListType[] = List.reduce((acc, val) => {
    const { product, quantity, variantSize } = val;
    if (!product || quantity <= 0) return acc;
    const price = Number(product.productPrice) * 10;
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
      variantSize: variantSize?.variantSizeId ?? null,
    });

    return acc;
  }, [] as ProductsListAPi[]);

  const onSubmit = async () => {
    try {
      let saleConfigObj = {
        TotalAmount: subTotal,
        TotalProductQty: TotalQty,
        TotalTax: TaxCal,
        shippingFee: ShippingFee,
        OrderProductList: productsList,
        razorpayOrderId: "ye56672g3dy3d7cdewffrev73vcye7ff",
        razorpayPaymentId: "ye56672g3dyfefefedde3d7cv73vcye7fffefr",
        razorpaySignature: "gwgr3ugrug32urgu3grueguerwrewrwe",

        customerName: `${userDataContext.info?.userFirstName} ${userDataContext.info?.userLastName} `,
        customerAddress: `${userDataContext.AddressList[selectedAddressIndex].addressLine1}  ${userDataContext.AddressList[selectedAddressIndex].addressLine2}`,
        customerState: userDataContext.AddressList[selectedAddressIndex].state,
        customerPinCode:
          userDataContext.AddressList[selectedAddressIndex].pinCode,
        customerCountry:
          userDataContext.AddressList[selectedAddressIndex].country,
        customerCountryCode:
          userDataContext.AddressList[selectedAddressIndex].countryCode,
        customerId: userDataContext?.info && userDataContext?.info?.id,
        customerEmail: userDataContext.AddressList[selectedAddressIndex].email,
        customerPhone:
          userDataContext.AddressList[selectedAddressIndex].contactNumber,
      };

      console.log("saleConfigObj", saleConfigObj);

      let res = await createSalesFunction(saleConfigObj);

      console.log(res);
    } catch (error: any) {
      notify({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      {stateModel.CreateAddress == true && (
        <CreateEditConfigAddressForm
          typeOperation="Create"
          onClose={() =>
            setStateModel((prev) => ({ ...prev, CreateAddress: false }))
          }
        />
      )}

      {stateModel.CreateAddress == false && (
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
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Delivery Address
            </h3>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 h-80 overflow-y-auto">
              {userDataContext.AddressList.map((val, index) => {
                const isSelected = selectedAddressIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedAddressIndex(index)}
                    className={`
    cursor-pointer flex flex-col justify-between
    rounded-2xl border
    p-4 sm:p-5
    transition-all duration-200
    active:scale-[0.99]
    ${
      isSelected
        ? "border-black ring-2 ring-black/10 bg-gray-50"
        : "border-gray-200 bg-white hover:border-gray-300"
    }
  `}
                  >
                    {/* Address Info */}
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-semibold text-gray-900">
                        {val.addressLine1}
                      </p>

                      {val.addressLine2 && (
                        <p className="text-sm text-gray-600">
                          {val.addressLine2}
                        </p>
                      )}

                      <p className="text-sm text-gray-700">
                        {val.city}, {val.state} – {val.pinCode}
                      </p>

                      <p className="text-sm text-gray-700">{val.country}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-3" />

                    {/* Contact */}
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        📞 {val.countryCode} {val.contactNumber}
                      </p>
                      {val.email && <p className="truncate">✉️ {val.email}</p>}
                    </div>

                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="mt-3 text-xs font-medium text-green-600">
                        ✓ Selected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="
    sticky bottom-0
    bg-white pt-4
    space-y-3
  "
            >
              <Button
                disabled={loading}
                onPress={() => onSubmit()}
                className={`
    w-full h-12 rounded-xl font-medium transition-all duration-200
    ${
      loading
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-black text-white hover:bg-black/90 active:scale-95"
    }
  `}
              >
                {loading ? (
                  <Image width={20} height={20} alt="Loading" src={Loader} />
                ) : (
                  "Continue"
                )}
              </Button>

              <Button
                type="button"
                onPress={() =>
                  setStateModel((prev) => ({ ...prev, CreateAddress: true }))
                }
                className="
    w-full h-11 rounded-xl
    border border-dashed border-gray-300
    text-sm font-medium
    text-gray-700
    hover:border-black hover:text-black
    active:scale-95
    transition
  "
              >
                + Add New Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
