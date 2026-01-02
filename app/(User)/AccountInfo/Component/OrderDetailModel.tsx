import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageShowUtil } from "@/app/utils/ImageShowUtil";
import { Button } from "@heroui/react";
import { Download } from "lucide-react";
import { useApi } from "@/app/useApi";
import axios from "axios";

export default function OrderDetails({ OrderData, onClose }: any) {
  const router = useRouter();
  const payment = OrderData?.payments?.[0];

  const { callApi } = useApi();

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      let res = await callApi("get", `/invoice-pdf/${invoiceId}`, {
        responseType: "blob", // ✅ MUST
      });
      const blob = res?.data ?? res;

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto  flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-300 px-4 sm:px-6 py-3 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center cursor-pointer gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
          Order Details
        </h2>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 sm:gap-6 p-3 sm:p-6">
        {/* LEFT */}
        <div className="flex flex-col overflow-hidden gap-6">
          {/* ORDER INFO */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100">
            <Info label="Order ID" value={OrderData?.orderId} />
            <Info label="Invoice ID" value={OrderData?.invoiceId} />
            <Info label="Payment Method" value={payment?.paymentMethod} />
            <Info
              label="Payment Date"
              value={
                payment?.paymentDate
                  ? new Date(payment.paymentDate).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"
              }
            />
          </section>

          {/* PRODUCTS */}
          <section className="flex-1 max-h-[300px]  overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Products ({OrderData?.products?.length || 0})
              </h3>
            </div>

            {/* SCROLL AREA */}
            <div className="h-full overflow-y-auto pr-2 space-y-3 scrollbar-hide scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {OrderData?.products?.map((val: any, index: number) => (
                <div
                  key={index}
                  onClick={() => router.push(`/all-Product/${val.productId}`)}
                  className="flex gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:shadow-sm hover:border-indigo-200 dark:hover:border-indigo-500 transition cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={
                        ImageShowUtil(val.productImage) ||
                        "/images/placeholder.webp"
                      }
                      alt={val.productName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                        {val.productName}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {val.productCategory}
                      </p>
                    </div>

                    {/* PRICE ROW */}
                    <div className="flex justify-between items-end mt-3 text-xs sm:text-sm">
                      <Meta label="Qty" value={val.quantity} />
                      <Meta label="Price" value={`₹${val.price}`} />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ₹{val.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SUMMARY */}
        <aside className="bg-white border-gray-100 rounded-2xl border p-4 sm:p-5 h-fit lg:sticky lg:top-20">
          <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">
            Order Summary
          </h3>

          <SummaryRow label="Total Quantity" value={OrderData?.totalQuantity} />
          <SummaryRow
            label="Shipping Fee"
            value={`₹${OrderData?.shippingFee}`}
          />
          <SummaryRow label="Tax" value={`₹${OrderData?.totalTax}`} />

          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>₹{OrderData?.totalPrice}</span>
          </div>

          <div className="flex justify-center py-6">
            <Button
              onPress={() => handleDownloadInvoice(OrderData.invoiceId)}
              className="group flex items-center gap-2 rounded-xl px-5 py-2.5 
               bg-black  text-white 
               shadow-md hover:shadow-lg transition"
            >
              Download Invoice
              <Download
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const Info = ({ label, value }: any) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900 dark:text-gray-200 break-all">
      {value || "—"}
    </p>
  </div>
);

const Meta = ({ label, value }: any) => (
  <span className="text-gray-600 dark:text-gray-300">
    {label}: <span className="font-medium">{value}</span>
  </span>
);

const SummaryRow = ({ label, value }: any) => (
  <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
