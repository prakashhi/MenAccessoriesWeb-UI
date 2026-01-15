"use client";

import Nav from "@/Component/NavBar/Nav";
import { motion } from "framer-motion";

export default function NoReturnPolicy() {
  return (
    <>
      <Nav />

      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-10 text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Return Policy
          </h1>

          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            At this time, we do not offer returns or exchanges on any products
            once an order has been placed and delivered.
          </p>

          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            Please review your order carefully before completing your purchase.
            If you have any questions before ordering, our support team will be
            happy to assist you.
          </p>

          {/* <div className="mt-8">
            <p className="text-sm text-gray-500">
              Need help before ordering?
            </p>

            <p className="text-sm sm:text-base font-medium text-gray-900 mt-1">
              📧 9rockinternational@gmail.com <br />
              📞 +91 94275 99999
            </p>
          </div> */}
        </motion.div>
      </section>
    </>
  );
}
