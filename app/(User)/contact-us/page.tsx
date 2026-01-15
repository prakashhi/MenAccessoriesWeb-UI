"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Nav from "@/Component/NavBar/Nav";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ContactUs() {
  return (
    <>
      <Nav />

      <section className="w-full min-h-screen px-4 sm:px-6 lg:px-24 py-20 bg-linear-to-b from-gray-50 to-white">
        {/* ===== HEADER ===== */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-serif">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            We’re always happy to help. Reach out for support, product queries,
            or order updates.
          </p>
        </motion.div>

        {/* ===== CONTENT ===== */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* ===== CONTACT INFO ===== */}
          <motion.div
            variants={item}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 flex flex-col gap-8"
          >
            <InfoItem
              icon={<Phone size={22} />}
              title="Phone"
              value="+91 94275 99999"
              href="tel:+919427599999"
            />
            <InfoItem
              icon={<Mail size={22} />}
              title="Email"
              value="9rockinternational@gmail.com"
              href="mailto:9rockinternational@gmail.com"
            />
            <InfoItem
              icon={<MapPin size={22} />}
              title="Address"
              value="Vasupujya Bungalows, 1, Opp. Bagyashree Apartments, Ahmedabad, Gujarat 380015, India"
            />
          </motion.div>

          {/* ===== WHATSAPP ===== */}
          <motion.div
            variants={item}
            className="bg-white rounded-3xl border border-gray-100 shadow-md p-10 text-center flex flex-col justify-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-green-500/10 text-green-600 rounded-full">
                <MessageCircle size={32} />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Chat on WhatsApp
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
              Instant replies for product queries, order status, and support —
              directly on WhatsApp.
            </p>

            <Link
              href="https://wa.me/9427599999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="
                inline-flex items-center justify-center gap-3
                bg-green-500 text-white
                px-10 py-3 rounded-full
                font-medium
                hover:bg-green-600
                active:scale-95
                transition
              "
            >
              <MessageCircle size={18} />
              Start WhatsApp Chat
            </Link>

            <p className="text-xs text-gray-500 mt-6">
              Available Mon–Sun · 10:00 AM – 7:00 PM
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

/* ===== Reusable Info Row ===== */
function InfoItem({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href && { href })}
      className="flex items-start gap-5 group cursor-default"
    >
      <div className="p-3 bg-black text-white rounded-xl group-hover:scale-105 transition">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed wrap-break-words">
          {value}
        </p>
      </div>
    </Wrapper>
  );
}
