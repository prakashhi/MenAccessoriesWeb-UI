"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MenNackLess from "@/public/Images/GroomNackless.jpeg";
import MenNackLess2 from "@/public/Images/Nackless4.jpeg";
import MenBroch from "@/public/Images/Button2.jpeg";
import MenBroch2 from "@/public/Images/Button1.jpeg";

import MenButton1 from "@/public/Images/Broch1.jpeg";
import MenButton2 from "@/public/Images/Broch2.jpeg";

export default function ImageSlider() {
  const images = [
    MenBroch,
    MenButton1,
    MenBroch2,

    MenNackLess,
    MenNackLess2,
    MenButton2,
  ];
  const autoSlideInterval = 4000;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full left-0 md:left-10 overflow-hidden  md:rounded-xl">
      <div className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence initial={false}>
          {images.map((img, idx) => (
            <motion.img
              key={idx}
              src={img.src}
              alt={`Slide ${idx + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentIndex ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute cursor-pointer w-full h-full object-cover top-0 left-0"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 cursor-pointer  rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-black scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
