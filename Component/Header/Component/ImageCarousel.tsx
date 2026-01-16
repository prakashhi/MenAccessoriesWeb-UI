"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrochImg from "@/public/Images/GroomNackless.jpeg";
import ButtonImg from "@/public/Images/Brouch8.jpeg";
import MenNickles from "@/public/Images/Nackless1.jpeg";
import Cufflinks from "@/public/Images/Brouch5.jpeg";
import Cufflinks2 from "@/public/Images/Brouch4.jpeg";
import ButtonImg2 from "@/public/Images/Nackless5.jpeg";
import BrouchImg3 from "@/public/Images/Broch1.jpeg";
import NAckless from "@/public/Images/Nackless3.jpeg";
import GoomNackless from "@/public/Images/GroomNackless2.jpeg";

import { Variants } from "framer-motion";

const images = [
  BrochImg,
  ButtonImg,
  MenNickles,
  ButtonImg2,
  Cufflinks,
  Cufflinks2,
  NAckless,
  BrouchImg3,
  GoomNackless,
];

/* ================= ANIMATIONS ================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ImageCarousel() {
  return (
    <>
      <motion.section
        className="w-full px-0 sm:px-6 lg:px-10 py-16 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <section className="w-full px-0 sm:px-6 lg:px-10 py-16 relative">
          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Collections
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Hand-picked styles curated just for you
              </p>
            </div>
          </motion.div>

          {/* ===== MASONRY GRID WITH FOG OVERLAY ===== */}
          <motion.div
            className="columns-2 sm:columns-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
          >
            {images.map((src, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative mb-4 cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-md bg-gray-100 group"
              >
                <Image
                  src={src}
                  alt={`Collection image ${index + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  placeholder="blur"
                />

                {/* FOG / SOFT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-50 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* ===== VIEW ALL COLLECTION BUTTON ===== */}
          <motion.div
            className="flex justify-center mt-14"
            variants={itemVariants}
          >
            <Link
              href="/collection"
              className="group relative inline-flex items-center gap-3 px-8 py-3 lg:px-8 lg:py-4 rounded-full
      bg-black text-white text-sm sm:text-base font-medium
      overflow-hidden hover:bg-gray-900 transition"
            >
              <span className="relative z-10 lg:text-md text-xs">
                View All Collections
              </span>
              <ArrowRight
                size={20}
                className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </section>
      </motion.section>
    </>
  );
}
