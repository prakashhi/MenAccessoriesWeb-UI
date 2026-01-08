"use client";

import Nav from "@/Component/NavBar/Nav";
import RightSection from "@/app/(User)/category/[CategotyId]/Components/RightSectionProduct";
import Footer from "@/Component/Footer/Footer";
import MobileFilterDrawer from "@/app/(User)/category/[CategotyId]/Components/MobileFilterDrawer";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UsePanel } from "@/context/Context";

import { menProductData } from "@/Type/Types";

export default function Page() {
  const { MenCategoryList, menProductFilter, setMenProductFilter } = UsePanel();

  const [data, setData] = useState<menProductData[]>([]);

  console.log("menProductFilter", menProductFilter);

  useEffect(() => {
    const getData = async () => {
      // setMenProductFilter((prev) => ({
      //   ...prev,
      //   categoryIds: ["3e1ae7d6-97aa-4068-9fbe-7c64b73525c1"],
      // }));

      if (!menProductFilter) return;

      let res = await MenCategoryList(menProductFilter);

      console.log("res", res);

      if (res.data) {
        setData(res.data.data);
      }
    };
    getData();
  }, [menProductFilter]);

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
            className="flex justify-center lg:mt-2 my-6"
          >
            <h2
              className="text-xl lg:text-3xl tracking-wide text-black"
              style={{
                fontFamily: "ui-serif",
                fontWeight: 800,
              }}
            >
              ALL Collations
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
              <RightSection ProductData={data} />
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
