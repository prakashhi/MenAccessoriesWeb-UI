"use client";

import { motion } from "framer-motion";
import ImageSlider from "./Component/ImageSlider";
import { Button } from "@heroui/react";
import { Sparkles, ArrowRight } from "lucide-react";
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
          className="text-2xl sm:text-4xl text-blue-950 md:text-4xl tracking-tight font-extrabold"
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
        className="mx-2 sm:mx-4 md:mx-6 lg:mx-10
  flex flex-col lg:flex-row
  rounded-2xl relative"
      >
        <ImageSlider />

        {/* Desktop Text Box */}
        <motion.div
          // initial={{ opacity: 0, x: 40 }}
          // animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:flex  w-full bg-[#F6F6F6]
              items-center rounded-r-xl justify-center text-center  px-10"
        >
          <div className="flex flex-col gap-5 text-center">
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
              }}
              className="text-3xl tracking-wide text-gray-900"
            >
              Let’s Feel It
            </span>

            {/* Description */}
            <p
              className="text-md text-gray-700 leading-relaxed"
              style={{ fontFamily: "ui-serif" }}
            >
              Explore the new collection of timeless fashion crafted for
              confidence and comfort.
            </p>

            {/* CTA */}
            <Button
              onPress={() => router.push("/collection")}
              endContent={<ArrowRight size={18} />}
              className="mx-auto px-8 py-6 text-base font-medium"
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
        <h2 className="text-xl font-semibold tracking-wide">Let’s Feel It</h2>
        <p className="text-sm text-gray-600 mt-1">
          Explore the New Collection of Timeless Fashion.
        </p>
      </motion.div>
    </header>
  );
}
