"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
  specifications: Record<string, string>;
}

export default function ProductDescription({
  description,
  specifications,
}: ProductDescriptionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-xl relative">
      {/* DESCRIPTION */}
      <div className="space-y-4 pb-6">
        <h3 className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
          Description
        </h3>

        <p className="text-gray-600 leading-relaxed text-sm">
          {description}
        </p>
      </div>

      {/* TOGGLE DRAWER BUTTON */}
      <div className="border-t">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center text-left py-2 hover:text-gray-900 transition-colors"
        >
          <h3 className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
            Material & Details
          </h3>
          <span className="text-xs text-gray-400 font-medium">
            {open ? "CLOSE" : "VIEW"}
          </span>
        </button>
      </div>

      {/* BACKDROP */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      {/* RIGHT SIDE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-white shadow-xl z-50 overflow-auto p-8"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors font-bold text-xl"
            >
              ×
            </button>

            {/* DRAWER HEADER */}
            <h3 className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
              Material & Details
            </h3>

            {/* SPECIFICATIONS */}
            <dl className="grid grid-cols-1 gap-y-4 text-sm">
              {specifications &&
                Object.entries(specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-6 border-b border-gray-100 pb-2"
                  >
                    <dt className="text-gray-500 capitalize font-medium tracking-wide">
                      {key.replace(/([A-Z])/g, " $1")}
                    </dt>
                    <dd className="text-gray-800 text-right font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
