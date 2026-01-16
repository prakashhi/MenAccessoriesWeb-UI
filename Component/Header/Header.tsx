"use client";

import { motion } from "framer-motion";
import ImageSlider from "./Component/ImageSlider";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="relative py-6 sm:pt-10 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-10 px-4"
      >
        <h1
          className="text-xl sm:text-4xl text-blue-950 md:text-4xl tracking-tight font-extrabold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Define Your Signature Look
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-1 bg-black mt-3 opacity-80 rounded-full"
        />
      </motion.div>

      {/* Image + Content */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="mx-0 sm:mx-4 md:mx-6 lg:mx-10
  flex flex-col lg:flex-row
  rounded-2xl relative"
      >
        <ImageSlider />

        {/* Desktop Text Box */}
        <motion.div
          // initial={{ opacity: 0, x: 40 }}
          // whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="
    hidden lg:flex
    w-full bg-[#F6F6F6]
    items-center justify-center
    rounded-r-xl
    px-12 py-16
  "
        >
          <div className="flex max-w-xl flex-col items-center gap-6 text-center">
            {/* Heading */}
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900"
            >
              Crafted for the Modern Gentleman
            </h2>

            {/* Description */}
            <p
              style={{ fontFamily: "ui-serif" }}
              className="text-sm sm:text-base leading-relaxed text-gray-700"
            >
              Discover premium men’s accessories designed to elevate your
              everyday style. From refined Button and Broch to statement pieces
              that define confidence, every detail is crafted for comfort,
              quality, and timeless appeal.
            </p>

            {/* CTA */}
            <Button
              onPress={() => router.push("/collection")}
              endContent={
                <span className="ml-1 inline-flex transform transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowRight size={18} />
                </span>
              }
              className="
    group
    mt-2
    px-8 py-6
    text-base font-medium
    bg-black text-white
    rounded-full
    transition-transform duration-300
    hover:scale-105
  "
            >
              Shop Now
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="lg:hidden flex flex-col items-center mt-4 px-3 overflow-hidden py-5 text-center"
      >
        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900"
        >
          Crafted for the Modern Gentleman
        </h2>
        <p
          style={{ fontFamily: "ui-serif" }}
          className="text-sm sm:text-base leading-relaxed text-gray-700"
        >
          Discover premium men’s accessories designed to elevate your everyday
          style. From refined Button and Broch to statement pieces that define
          confidence, every detail is crafted for comfort, quality, and timeless
          appeal.
        </p>

        <Button
          onPress={() => router.push("/collection")}
          endContent={<ArrowRight size={18} />}
          className="
        lg:mt-2 mt-5
        px-5 py-3
        text-xs font-medium
        transition-transform
        hover:scale-105
        bg-black rounded-full text-white 
      "
        >
          Shop Now
        </Button>
      </motion.div>
    </header>
  );
}
