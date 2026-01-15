"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrochImg from "@/public/Images/il_680x540.7199741956_g139.jpg";
import ButtonImg from "@/public/Images/2377a7234f6c3473822b59f53120b1ca.jpg";
import MenNickles from "@/public/Images/a0d480b8ddd82878d54ad84298542904.jpg";
import Cufflinks from "@/public/Images/e38d41d842b77bea875ce96014f7bbf6.jpg";
import Cufflinks2 from "@/public/Images/a0b9682ff1a4a99bad899e8576cc1a4a.jpg";

export default function ImageSlider() {
  const images = [MenNickles, ButtonImg, Cufflinks, Cufflinks2, BrochImg];
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
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
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
