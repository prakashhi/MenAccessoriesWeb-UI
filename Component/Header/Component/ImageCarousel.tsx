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
import NAckless from "@/public/Images/Nackless3.jpeg";


import { Variants } from "framer-motion";

import ButtonImg2 from "@/public/Images/ButtonImg3.jpg"
import ButtonImg3 from "@/public/Images/B67WK4225-with-qr.jpg"
import CuflineImg2 from "@/public/Images/C0PBWF4012-with-qr.jpg"
import BrouchImg2 from "@/public/Images/018GWBK540-with-qr.jpg"
import BrouchImg3 from "@/public/Images/00RGOK543-with-qr.jpg"

const images = [
    BrouchImg2,
  CuflineImg2,
  BrochImg,
  ButtonImg,
  MenNickles,
  ButtonImg3,
  ButtonImg2,
  Cufflinks2,
  NAckless,
  BrouchImg3,

];


/* ================= ANIMATIONS ================= */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1], // luxury easing
    },
  },
};

export default function ImageCarousel() {
  return (
    <>
      <motion.section
        className="w-full px-2 sm:px-6 lg:px-10 my-10 relative bg-[#FAFAFA]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <section className="w-full px-0 sm:px-6 lg:px-10 py-16 relative">
          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
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
              className="group relative inline-flex items-center gap-3 px-8 py-3 lg:px-8 lg:py-2 
        text-sm sm:text-base font-medium
      overflow-hidden   transition"
            >
              <span className="relative z-10 lg:text-md text-xs">
                View More
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
