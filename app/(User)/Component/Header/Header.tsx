"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import headerImg from "@/public/Images/il_680x540.7199741956_g139.jpg";

export default function Header() {
  return (
    <header className="relative pt-6 sm:pt-10 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-6 sm:mb-10"
      >
        <h1
          className="text-[22px] sm:text-3xl md:text-4xl tracking-tight font-bold"
          style={{ fontFamily: "ui-serif", fontWeight: 900 }}
        >
          Define Your Signature Look
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-0.5 bg-black mt-2 opacity-60"
        />
      </motion.div>

      {/* Image + Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="mx-2 sm:mx-4 md:mx-6 lg:mx-10
          flex flex-col lg:flex-row
          shadow-xl rounded-2xl overflow-hidden bg-white"
      >
        {/* Image */}
        <motion.div
          className="w-full lg:w-[70%]"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            className="w-full h-auto object-cover"
            src={headerImg}
            alt="Header"
            priority
          />
        </motion.div>

        {/* Desktop Text Box */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:flex w-full bg-[#F6F6F6]
            items-center justify-center text-center px-10"
        >
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-3xl tracking-wide">
              Let’s Feel It
            </span>
            <p className="text-lg text-gray-700">
              Explore the New Collection of Timeless Fashion.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="lg:hidden flex flex-col items-center mt-4 px-3 text-center"
      >
        <h2 className="text-xl font-semibold tracking-wide">Let’s Feel It</h2>
        <p className="text-sm text-gray-600 mt-1">
          Explore the New Collection of Timeless Fashion.
        </p>
      </motion.div>
    </header>
  );
}
