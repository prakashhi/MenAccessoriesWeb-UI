"use client";

import Nav from "@/Component/NavBar/Nav";
import RightSection from "./Components/RightSectionProduct";
import Footer from "@/Component/Footer/Footer";
import MobileFilterDrawer from "./Components/MobileFilterDrawer";
import { motion } from "framer-motion";
import { useInfiniteProductsOffset } from "../../collection/Component/infinityScrollProduct";

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
            className="flex justify-center  lg:mt-2 py-6 "
          >
            <h2
              className="text-xl lg:text-3xl   tracking-wide text-blue-950"
              style={{
                fontFamily: "ui-serif",
                fontWeight: 800,
              }}
            >
              {products?.[0]?.categoryName}
            </h2>
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

      <MobileFilterDrawer />
      <Footer />
    </>
  );
}
