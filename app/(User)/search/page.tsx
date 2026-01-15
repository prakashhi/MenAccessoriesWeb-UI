"use client";

import Nav from "@/Component/NavBar/Nav";
import RightSection from "@/app/(User)/category/[categoryId]/Components/RightSectionProduct";
import Footer from "@/Component/Footer/Footer";
import MobileFilterDrawer from "@/app/(User)/category/[categoryId]/Components/MobileFilterDrawer";
import { motion } from "framer-motion";
import { UsePanel } from "@/context/Context";

export default function Page() {
  const { menProductFilter } = UsePanel();

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
            className="flex justify-center mt-8 "
          >
            <h2
              className="text-2xl lg:text-4xl font-extrabold"
              style={{ fontFamily: "ui-serif", fontWeight: 800 }}
            >
              Search Product "{menProductFilter.keyword}"
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

      {/* FOOTER */}
      <Footer />
    </>
  );
}
