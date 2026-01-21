import { notify } from "@/Component/ToastComponent";
import { UsePanel } from "@/context/Context";
import { RazorpayConstructor, RazorpayResponse } from "@/Type/razorPayType";
import { createSaleConfigType } from "@/Type/UserDetailType";

const MaxTotalAmount = 5_00_000;
declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}
export const useRazorpayPayment = () => {
  const {
    userDataContext,
    createSalesFunction,
    CreateInVoice,
    setOpenModel,
    setPaymentData
  } = UsePanel();

  const PaymentSuccess = () => {
    setOpenModel((prev) => ({ ...prev, PaymentSuccessModel: true }));
  };

  const PaymentFail = () => {
    setOpenModel((prev) => ({ ...prev, PaymentFailModel: true }));
  };
  const handleRazorpayPayment = async (saleConfigObj: createSaleConfigType) => {
    try {

      const orderRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: saleConfigObj.TotalAmount }),
      });

      const { order } = await orderRes.json();

      if (!order?.id) {
        notify({
          message: "Failed to create payment order",
          type: "error",
        });
        return;
      }

      let InVoiceConfig = {
        invoiceId: `Inv-${
          Date.now() + Math.random().toString(36).substring(2, 5)
        }`,
        nineRockUserId: userDataContext.info?.id || "",
        productIds: saleConfigObj.OrderProductList.map(
          (item) => item.productId,
        ).join(","),
        productQuantity: saleConfigObj.TotalProductQty,
        tax: saleConfigObj.TotalTax,
        shippingFee: saleConfigObj.shippingFee,
        totalPrice: Math.ceil(saleConfigObj.TotalAmount),
      };

      const invoiceRes = await CreateInVoice(InVoiceConfig);

      if (!invoiceRes.success|| !invoiceRes.data?.invoiceId ) {
        notify({
          message: "Failed to create invoice",
          type: "error",
        });
        return;
      }

      let InvoiceId: string = invoiceRes.data.invoiceId;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "9ROCK STUDIOS",
        description: "9ROCK STUDIOS Purchase",
        image: `${process.env.NEXT_PUBLIC_IMG_URL}logo.jpg`,
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          try {
            let res = await createSalesFunction({
              ...saleConfigObj,
              invoiceId: InvoiceId,
              orderId: order.id,
              transactionId: response.razorpay_payment_id,
              razorpayOrderId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });


            if (res.success === true) {
              notify({
                message: "Payment successful! Your order has been placed.",
                type: "success",
              });

              PaymentSuccess();
              setPaymentData(res.data);
            } else {
              PaymentFail();
            }
          } catch (error) {
            console.error("Error creating sales object:", error);
          }
        },
        prefill: {
          email: saleConfigObj.customerEmail || "",
          contact: saleConfigObj.customerPhone || "",
        },
        theme: {
          color: "#f0f0f0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  return { handleRazorpayPayment };
};
