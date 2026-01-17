"use client";

import Nav from "@/Component/NavBar/Nav";
import RightSection from "./Components/RightSectionProduct";
import Footer from "@/Component/Footer/Footer";
import MobileFilterDrawer from "./Components/MobileFilterDrawer";
import { motion } from "framer-motion";
import { useInfiniteProductsOffset } from "../../collection/Component/infinityScrollProduct";
import GoToTop from "@/Component/GoToTop";

export default function Page() {
  const { products } = useInfiniteProductsOffset();
  return (
    <>
      <Nav />

      {/* PAGE FADE IN */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* MAIN WRAPPER */}
        <div className="w-full mx-auto px-1 lg:px-6">
          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center  lg:mt-2 lg:py-6 py-2"
          >
            <div className="flex flex-col items-center text-center ">
              <h2
                className="
      mt-4
      text-3xl sm:text-4xl lg:text-5xl
      text-gray-900
      tracking-tight
      leading-tight
    "
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                }}
              >
                {products?.[0]?.categoryName}
              </h2>

              <div className="lg:mt-6 mt-3 h-0.5 w-16 bg-gray-300 rounded-full" />
            </div>
          </motion.div>

          {/* CONTENT GRID */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className=""
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className=" p-2"
            >
              <RightSection />
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      <GoToTop />

      <MobileFilterDrawer />
      <Footer />
    </>
  );
}
