
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MenNackLess from "@/public/Images/GroomNackless.jpeg";
import MenNackLess2 from "@/public/Images/Nackless4.jpeg";
import MenBroch from "@/public/Images/Button2.jpeg";
import MenBroch2 from "@/public/Images/Button1.jpeg";
import MenButton2 from "@/public/Images/Broch2.jpeg";
import ButtonImg1 from "@/public/Images/ButtonImg1.jpg";
import CuflineImg1 from "@/public/Images/CuflineImg1.jpg";
import BrouchImg1 from "@/public/Images/BrouchImg1.jpg";

export default function ImageSlider() {
  const images = [
    MenBroch,
    ButtonImg1,
    MenBroch2,
    CuflineImg1,
    BrouchImg1,
    MenNackLess,
    MenNackLess2,
    MenButton2,
  ];

  const autoSlideInterval = 4000;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full left-0 md:left-10 overflow-hidden md:rounded-xl group">
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
              className="absolute w-full h-full object-cover top-0 left-0"
            />
          ))}
        </AnimatePresence>

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="
            absolute left-4 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur
            flex items-center justify-center
            text-white
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:scale-110
            cursor-pointer
          "
        >
          <ChevronLeft size={18} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur
            flex items-center justify-center
            text-white
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:scale-110
             cursor-pointer
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Bottom Dots (UNCHANGED) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-black scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
