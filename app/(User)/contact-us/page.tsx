"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

import Nav from "@/Component/NavBar/Nav";

export default function ContactUs() {
  return (
    <>
      <Nav />

      <section className="w-full px-4 sm:px-6 lg:px-24 py-16 bg-gray-50 min-h-screen">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            We’re always happy to help. Reach out for support, product queries,
            or order updates.
          </p>
        </motion.div>

        {/* ===== CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          {/* ===== CONTACT INFO ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center gap-6"
          >
            {/* Phone */}
            <div className="flex items-center gap-5">
              <div className="p-3 bg-black text-white rounded-xl">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  +91 92345 67890
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5">
              <div className="p-3 bg-black text-white rounded-xl">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600 text-sm sm:text-base break-all">
                  hello@yourbrand.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-5">
              <div className="p-3 bg-black text-white rounded-xl">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  123 Fashion Street,<br />
                  Gandhinagar, Gujarat,<br />
                  India
                </p>
              </div>
            </div>
          </motion.div>

          {/* ===== WHATSAPP CHAT ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 flex flex-col justify-center text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-green-500/10 text-green-600 rounded-full">
                <MessageCircle size={30} />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Chat on WhatsApp
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
              Instant replies for product queries, order status, and support —
              directly on WhatsApp.
            </p>

            <a
              href="https://wa.me/919234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-3
                bg-green-500 text-white
                px-10 py-3 rounded-full
                font-medium
                hover:bg-green-600
                transition
              "
            >
              <MessageCircle size={18} />
              Start WhatsApp Chat
            </a>

            <p className="text-xs text-gray-500 mt-6">
              Available Mon–Sat · 10:00 AM – 7:00 PM
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
