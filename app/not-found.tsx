"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center"
      >
        {/* 404 */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[96px] font-black tracking-tight text-gray-900"
        >
          404
        </motion.h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-3 leading-relaxed">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link
            href="/"
            className="
              px-6 py-3
              rounded-full
              bg-black text-white
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            Go Home
          </Link>

          <Link
            href="/products"
            className="
              px-6 py-3
              rounded-full
              border border-gray-300
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
