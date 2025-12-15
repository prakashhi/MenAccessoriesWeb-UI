"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImageIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              alt={name}
              src={images[mainImageIndex]}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* THUMBNAILS */}
      <div
        className={`flex items-center ${
          images.length > 2 ? "justify-between" : "justify-evenly"
        } gap-3 mt-2`}
      >
        {images.slice(0, 3).map((img, idx) => (
          <div
            key={idx}
            onClick={() => setMainImageIndex(idx)}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 
              ${mainImageIndex === idx ? "border-gray-500" : "border-gray-300"}
              transition-all duration-300 hover:scale-105`}
          >
            <Image
              src={img}
              width={110}
              height={110}
              alt={`thumb-${idx}`}
              className="object-cover w-24 h-24 sm:w-28 sm:h-28"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
