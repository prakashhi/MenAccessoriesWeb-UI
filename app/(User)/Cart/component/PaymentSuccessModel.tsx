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
}: {
  label: string;
  value: string;
  success?: boolean;
}) => (
  <div className="flex justify-between py-1 text-gray-700 dark:text-gray-300">
    <span className="opacity-70">{label}</span>
    <span
      className={success ? "text-emerald-600 font-semibold" : "font-medium"}
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

  console.log(PaymentData);
  return (
    <AnimatePresence>
      <>
        {/* OVERLAY */}
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        {/* MODAL WRAPPER */}
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-[#0f0f0f]
            rounded-[2.5rem] px-8 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)]
            border border-gray-100 dark:border-gray-800 flex flex-col items-center"
          >
            {/* SUCCESS ICON */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-300/20
              flex items-center justify-center shadow-xl"
            >
              <RiCheckLine className="w-14 h-14 text-emerald-700 dark:text-emerald-400" />
            </motion.div>

            {/* TITLE */}
            <h2
              className="mt-6 text-2xl sm:text-3xl font-serif font-extrabold tracking-[0.15em]
            text-gray-900 dark:text-white text-center"
            >
              Payment Successful
            </h2>

            {/* AMOUNT */}
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Amount Paid
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              ₹{amount.toLocaleString("en-IN")}
            </p>

            {/* ORDER DETAILS */}
            {/* <div className="mt-6 w-full rounded-xl bg-gray-50 dark:bg-[#161616] p-4 text-sm">
              <DetailRow label="Order ID" value={orderId} />
              <DetailRow label="Payment Method" value={paymentMethod} />
              <DetailRow label="Status" value="Confirmed" success />
            </div> */}

            {/* ACTIONS */}
            <div className="mt-8 w-full flex flex-col gap-3">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-black via-gray-900 to-black
                text-white font-semibold tracking-wide hover:scale-[1.03]
                transition-all duration-300 shadow-xl"
              >
                Continue Shopping
              </button>

              {/* <button
                onClick={onViewOrder}
                className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700
                text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100
                dark:hover:bg-[#1a1a1a] transition-all"
              >
                View Order Details
              </button> */}
            </div>
          </motion.div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
