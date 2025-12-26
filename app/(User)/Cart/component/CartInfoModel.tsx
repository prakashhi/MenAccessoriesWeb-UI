"use client";

import { AnimatePresence, motion } from "framer-motion";


interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function CartInfoModal({ open, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ===== BLUR OVERLAY ===== */}
          <motion.div
            className="fixed inset-0 backdrop-blur-lg bg-gray-200/40 z-9998"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-9999 flex items-center lg:mt-10 justify-center px-4 z"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            {/* ===== FLOATING CONTENT (NO BG) ===== */}
            <div className=" w-full max-w-xl rounded-3xl ">

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
