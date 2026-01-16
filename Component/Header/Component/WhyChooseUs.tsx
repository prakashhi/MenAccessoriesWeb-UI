"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gem, Truck, Headphones } from "lucide-react";

const highlights = [
  {
    icon: Gem,
    title: "Refined Craftsmanship",
    desc: "Expertly crafted accessories using premium materials, designed to last beyond trends.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromised Quality",
    desc: "Every detail is carefully inspected to meet the highest standards of excellence.",
  },
  {
    icon: Truck,
    title: "Seamless Delivery",
    desc: "Reliable and timely delivery, ensuring your essentials arrive effortlessly.",
  },
  {
    icon: Headphones,
    title: "Personalized Support",
    desc: "Thoughtful assistance whenever you need it, before and after your purchase.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#FAFAFA] py-28 px-6 lg:px-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center mb-20"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-gray-400">
          Why Choose Us
        </span>

        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="mt-6 text-3xl sm:text-4xl md:text-[42px] font-light text-gray-900"
        >
          Designed with Intention.
          <br />
          Chosen for Confidence.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed">
          Every accessory reflects a philosophy of understated luxury—where
          craftsmanship, precision, and timeless design come together.
        </p>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto"
      >
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
            className="
              group
              rounded-3xl
              bg-white
              px-8 py-10
              text-center
              transition
              hover:-translate-y-1
              cursor-pointer
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]
            "
          >
            <item.icon
              size={30}
              strokeWidth={1.2}
              className="mx-auto mb-6 text-gray-700 group-hover:text-gray-900 transition-colors"
            />

            <h3 className="text-base font-medium text-gray-900 tracking-wide">
              {item.title}
            </h3>

            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
