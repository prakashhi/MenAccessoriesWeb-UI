import { OrderDetailType } from "@/app/(User)/Type/UserDetailtype";

export default function OrderListComponent({
  Data,
  openDetail,
  onCloseDetail,
  setOderDetail,
}: {
  Data: OrderDetailType;
  openDetail: () => void;
  onCloseDetail: () => void;
  setOderDetail: React.Dispatch<React.SetStateAction<OrderDetailType>>;
}) {
  return (
    <>
      <div className="rounded-2xl  border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5">
        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* ORDER ID */}
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-400">Order ID</p>
            <p className="text-xs sm:text-xs font-medium break-all text-gray-500 dark:text-gray-200">
              {Data.orderId}
            </p>
          </div>

          {/* PAYMENT STATUS */}
          <span
            className={`w-fit text-xs font-semibold px-3 py-1 rounded-full ${
              Data.payments[0].paymentStatus === "PAID"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : Data.payments[0].paymentStatus === "PENDING"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {Data.payments[0].paymentStatus}
          </span>
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-px bg-gray-200 dark:bg-gray-700" />

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          {/* DATE */}
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-400">
              Payment Date
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-200">
              {new Date(Data.payments[0].paymentDate).toLocaleString()}
            </p>
          </div>

          {/* TOTAL */}
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-400">
              Total Amount
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-white">
              ₹{Data.payments[0].paymentAmount}
            </p>
          </div>

          {/* ORDER STATUS */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm text-gray-800 dark:text-gray-400">
              Order Status
            </p>
            <p className="text-xs font-medium capitalize text-gray-500 dark:text-gray-200">
              {Data.salesStatus}
            </p>
          </div>
        </div>

        {/* ACTIONS (optional) */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              setOderDetail(Data);
              openDetail();
            }}
            className="text-xs sm:text-sm cursor-pointer font-medium text-indigo-600 hover:underline"
          >
            View Order Details
          </button>
        </div>
      </div>
    </>
  );
}
