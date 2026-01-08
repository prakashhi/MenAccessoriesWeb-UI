"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiCheckLine } from "react-icons/ri";
import { Variants } from "framer-motion";

interface PaymentSuccessModalProps {
  onClose: () => void;
  amount?: number;
  PaymentData: any;
}

const DetailRow = ({
  label,
  value,
  success,
  valueClass,
}: {
  label: string;
  value: string;
  success?: boolean;
  valueClass?: string;
}) => (
  <div className="flex justify-between py-1 text-gray-700 dark:text-gray-300">
    <span className="opacity-70 text-xs sm:text-sm lg:text-md ">{label}</span>
    <span
      className={`${valueClass} text-xs sm:text-sm lg:text-md  ${
        success ? "text-emerald-600 font-semibold" : "font-medium"
      }`}
    >
      {value}
    </span>
  </div>
);

export default function PaymentSuccessModal({
  onClose,
  amount = 0,
  PaymentData,
}: PaymentSuccessModalProps) {
  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1], // ✅ correct
      },
    },
  };


  return (
    <AnimatePresence>
      <>
        {/* OVERLAY */}
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center  p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md
      bg-white dark:bg-[#0c0c0c]
      lg:rounded-[2.8rem] rounded-4xl px-6  sm:px-8 py-8 sm:py-10
      shadow-[0_30px_70px_rgba(0,0,0,0.35)]
      border border-gray-100 dark:border-gray-800
      flex flex-col items-center "
          >
            {/* ICON */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full
        bg-linear-to-br from-emerald-300/30 to-emerald-500/10
        flex items-center justify-center
        shadow-[0_0_40px_rgba(16,185,129,0.35)]"
            >
              <RiCheckLine className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-700 dark:text-emerald-400" />
            </motion.div>

            {/* TITLE */}
            <h2
              style={{ fontFamily: "revert" }}
              className="mt-6 sm:mt-7 text-md sm:text-xl font-bold
        tracking-[0.15em] sm:tracking-[0.18em] uppercase
        text-gray-900 dark:text-white text-center"
            >
              Order Successful
            </h2>

            {/* AMOUNT */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
              <p
                className="mt-2 text-3xl sm:text-4xl font-semibold 
        text-gray-900 dark:text-white"
              >
                ₹{PaymentData.totalPrice.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                (Including all taxes)
              </p>
            </div>

            {/* DETAILS */}
            <div
              className="mt-5 sm:mt-6 w-full rounded-2xl 
      bg-gray-50 dark:bg-[#151515] p-4 sm:p-5 
      text-sm space-y-2.5 sm:space-y-3"
            >
              <DetailRow
                label="Transaction ID"
                value={PaymentData.payments[0].transactionId}
                valueClass="text-gray-800     dark:text-gray-200 "
              />

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              <DetailRow
                label="Payment Method"
                value="Cash on Delivery"
                valueClass="text-gray-800 dark:text-gray-200"
              />

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              <DetailRow
                label="Status"
                value="Payable at delivery"
                success
                valueClass="font-medium text-emerald-600 dark:text-emerald-400"
              />

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              <DetailRow
                label="Items Ordered"
                value={`${PaymentData.totalQuantity} item${
                  PaymentData.totalQuantity > 1 ? "s" : ""
                }`}
                valueClass="text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* ACTION */}
            <button
              onClick={onClose}
              className="mt-7 sm:mt-8 w-full py-3.5 sm:py-4 cursor-pointer rounded-xl
        bg-black dark:bg-gray-900 text-white font-medium 
        tracking-wider sm:tracking-widest
        hover:scale-[1.02] active:scale-[0.99]
        transition-all duration-300
        shadow-[0_15px_40px_rgba(0,0,0,0.4)]
        border border-gray-800 dark:border-gray-700 text-xs sm:text-sm lg:text-md "
            >
              Continue Shopping
            </button>

            {/* FOOTER NOTE */}
            <p className="mt-4 text-xs text-center  text-gray-500 dark:text-gray-400">
              Order confirmation email sent
            </p>
          </motion.div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
