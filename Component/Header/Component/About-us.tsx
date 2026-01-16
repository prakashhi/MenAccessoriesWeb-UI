"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AboutUsComponent() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section className="relative w-full bg-white py-20 px-6 sm:px-10 lg:px-32 overflow-hidden">
      {/* Top Fog / Gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-white/90 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col gap-8">
        {/* Label */}
        <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400">
          About Us
        </span>

        {/* Heading */}
        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl sm:text-4xl md:text-4xl font-semibold text-gray-900 leading-tight"
        >
          Where Craft Meets Character
        </h2>

        {/* Short Story */}
        <p
          style={{ fontFamily: "ui-serif" }}
          className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          True style is never accidental. It is built through intention,
          precision, and respect for detail. Our journey began with a simple
          belief — men’s accessories should speak quietly, yet leave a lasting
          impression.
        </p>

        {/* Full Story (Hidden initially, animated) */}
        <AnimatePresence>
          {showFullStory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mt-6 space-y-4"
            >
              <p>
                From carefully selected materials to refined silhouettes, each
                piece reflects a balance of modern elegance and timeless
                craftsmanship. Designed not to follow trends, but to endure
                beyond them.
              </p>
              <p>
                Our journey has been one of dedication — from small artisan
                workshops to collaborating with skilled craftsmen globally.
                Every collection tells a story of meticulous attention,
                unwavering quality, and a vision for understated sophistication.
              </p>
              <p>
                Today, we continue to innovate while honoring tradition,
                creating accessories that empower men to express confidence
                effortlessly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <button
          onClick={() => setShowFullStory(!showFullStory)}
          className="
            mx-auto mt-6
            inline-flex items-center gap-3
            px-9 py-3
            text-sm sm:text-base font-medium tracking-wide
            bg-black text-white rounded-full
            transition-all duration-300
            hover:scale-105
          "
        >
          {showFullStory ? "View Less" : "Discover Our Journey"}
        </button>
      </div>
    </section>
  );
}
