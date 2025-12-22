"use client";

import Nav from "@/app/(User)/Component/NavBar/Nav";
import { useParams } from "next/navigation";
import { LeftBar } from "./Componets/LeftBar";
import RightSection from "./Componets/RightSectionProduct";
import Footer from "@/app/(User)/Component/Footer/Footer";
import MobileFilterDrawer from "./Componets/MobileFilterDrawer";
import { useApi } from "@/app/useApi";
import { notify } from "../../Component/ToastComponent";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Data, ProductInfoType } from "@/app/(User)/Type/Types";

export default function Page() {
  const params = useParams();
  const { callApi } = useApi();

  const [data, setData] = useState<ProductInfoType[]>([]);

  const getData = useCallback(async () => {
    const res = await callApi(
      "get",
      `/product-category-list?id=${params.CategotyId}&limit=100&offset=0`
    );

    // const res = await callApi(
    //   "get",
    //   "https://backend.9rock.in/9rock/cat-with-products"
    // );

    // setData(res.data);

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
            {/* LEFT BAR */}
            {/* <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <LeftBar />
            </motion.div> */}

            {/* RIGHT SECTION */}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className=" sm:p-5 p-2"
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
