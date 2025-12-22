"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiCheckLine } from "react-icons/ri";
import { Variants } from "framer-motion";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  amount = 0,
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
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              className="bg-white dark:bg-[#111] rounded-[2.5rem] shadow-2xl max-w-sm w-full p-8 flex flex-col items-center gap-6 border border-gray-100 dark:border-gray-700"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {/* ✅ ICON */}
              <motion.div
                className="w-28 h-28 rounded-full bg-gradient-to-br from-green-200/30 to-green-300/20 flex items-center justify-center shadow-lg"
                variants={fadeUp}
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <RiCheckLine className="text-green-700 w-14 h-14 drop-shadow-md" />
              </motion.div>

              {/* TITLE */}
              <motion.h2
                className="text-2xl sm:text-3xl font-serif font-extrabold text-center tracking-[0.15em] text-gray-900 dark:text-gray-50"
                style={{ fontFamily: "'Playfair Display', serif" }}
                variants={fadeUp}
              >
                Payment Successful
              </motion.h2>

              {/* AMOUNT */}
              <motion.p
                className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base font-medium"
                variants={fadeUp}
              >
                Amount Paid:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
              </motion.p>

              {/* BUTTON */}
              <motion.button
                onClick={onClose}
                className="mt-6 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-3 rounded-xl font-semibold tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                variants={fadeUp}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
