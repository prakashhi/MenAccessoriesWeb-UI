"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrochImg from "@/public/Images/il_680x540.7199741956_g139.jpg";
import ButtonImg from "@/public/Images/2377a7234f6c3473822b59f53120b1ca.jpg";
import MenNickles from "@/public/Images/a0d480b8ddd82878d54ad84298542904.jpg";
import Cufflinks from "@/public/Images/e38d41d842b77bea875ce96014f7bbf6.jpg";
import Cufflinks2 from "@/public/Images/a0b9682ff1a4a99bad899e8576cc1a4a.jpg";
import ButtonImg2 from "@/public/Images/edd22b6cd4ef931fc6eb0edf607640ed.jpg";
import { Variants } from "framer-motion";

import BrouchImg3 from "@/public/Images/66f87ba1d512f9f10034b3f3da2410d8.jpg";

const images = [
  BrochImg,
  ButtonImg,
  ButtonImg2,
  MenNickles,
  Cufflinks,
  Cufflinks2,
  BrouchImg3,
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

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ImageCarousel() {
  return (
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

            {/* Optional: text overlay on hover */}
            {/* <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white font-semibold text-sm sm:text-base">
                Explore
              </span>
            </div> */}
          </motion.div>
        ))}
      </motion.div>

      {/* ===== VIEW ALL COLLECTION BUTTON ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex justify-center mt-14"
      >
        <Link
          href="/collection"
          className="
            group relative inline-flex items-center gap-3 px-8 py-3 lg:px-8 lg:py-4 rounded-full
            bg-black text-white text-sm sm:text-base font-medium
            overflow-hidden
            hover:bg-gray-900
            transition
          "
        >
          <span className="relative z-10 lg:text-md text-xs">
            View All Collections
          </span>
          <ArrowRight
            size={20}
            className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300"
          />
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </motion.div>
    </section>
  );
}
