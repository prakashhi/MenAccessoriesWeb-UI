"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function CartInfoModal({
  open,
  onClose,
  children,
  title = "Checkout Details",
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ===== OVERLAY ===== */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ===== MODAL WRAPPER ===== */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center px-3 sm:px-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
          >
            {/* ===== MODAL BOX ===== */}
            <div className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
              
              {/* ===== DRAG INDICATOR (MOBILE) ===== */}
              <div className="sm:hidden flex justify-center py-2">
                <div className="w-12 h-1.5 rounded-full bg-gray-300" />
              </div>

              {/* ===== HEADER ===== */}
              <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/90 backdrop-blur  px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-wide text-gray-900">
                  {title}
                </h3>

                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                  aria-label="Close modal"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              {/* ===== CONTENT ===== */}
              <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
