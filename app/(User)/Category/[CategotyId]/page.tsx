"use client";

import Nav from "@/Component/NavBar/Nav";
import { useParams } from "next/navigation";
import RightSection from "./Components/RightSectionProduct";
import Footer from "@/Component/Footer/Footer";
import MobileFilterDrawer from "./Components/MobileFilterDrawer";
import { useApi } from "@/app/useApi";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductInfoType } from "@/Type/ProductType";

export default function Page() {
  const params = useParams();
  const { callApi, loading } = useApi();

  const [data, setData] = useState<ProductInfoType[]>([]);

  const getData = useCallback(async () => {
    // const res = await axios.get('http//localhost:3005/9rock/get-products', {
    //   params : {
    //     categoryIds : ["a5834d51-f02b-468c-912f-050e1d3fa6e1"]
    //   }
    // })/

    const res = await callApi("get", "/9rock/get-products", {
      params: {
        categoryIds: [`${process.env.NEXT_PUBLIC_MENS_CAT_ID}`],
      },
    });
    setData(res.data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {/* Mobile Drawer */}

      {/* Top Navigation */}
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
              {data?.[0]?.categoryName}
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
