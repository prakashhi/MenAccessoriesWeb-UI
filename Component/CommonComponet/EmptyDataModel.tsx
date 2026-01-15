import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiHeart,
  FiShoppingBag,
  FiX,
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";


export default function EmptyDataModel({
  message,
  Icon,
}: {
  message: string;
  Icon: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-28 lg:py-8 gap-8 sm:gap-10 md:gap-12"
      >
        <div className="relative">
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-neutral-300 
                              flex items-center justify-center mb-6 sm:mb-8"
          >
            {Icon}
          </div>
          {/* <div
            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full 
                              border border-neutral-300 animate-pulse"
          /> */}
        </div>

        <div className="text-center space-y-3 sm:space-y-4 px-4">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider sm:tracking-widest text-neutral-800"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {message}
          </h2>
          <p className="text-xs sm:text-sm tracking-widest sm:tracking-[0.15em] text-neutral-500 font-light max-w-xs sm:max-w-sm md:max-w-md mx-auto leading-relaxed">
            Curate your collection of desired pieces. Each item you save
            reflects your timeless taste.
          </p>
        </div>

        <Link
          href="/"
          className="group relative border border-neutral-900 px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-xs 
                         tracking-[0.2em] sm:tracking-[0.3em] uppercase text-neutral-900 hover:text-white 
                         transition-all duration-500 overflow-hidden  w-full max-w-xs sm:max-w-sm text-center"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            EXPLORE COLLECTION
            <FiChevronRight
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 
                                           group-hover:translate-x-1"
            />
          </span>
          <div
            className="absolute inset-0 bg-neutral-900 translate-x-full
                              group-hover:translate-x-0 transition-transform duration-500"
          />
        </Link>
      </motion.div>
    </>
  );
}
