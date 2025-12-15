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

export default function Page() {
  const params = useParams();
  const { callApi } = useApi();

  const [data, setData] = useState<any[]>([]);

  const getData = useCallback(async () => {
    const res = await callApi("get", "/9rock/cat-with-products");

    if (res?.error) {
      notify({
        message: res.message || "Something went wrong!",
        type: "error",
      });
      return;
    }

    setData(res.data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {/* Mobile Drawer */}
      <MobileFilterDrawer />

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
            className="flex justify-center lg:mt-14 my-6"
          >
            <h2
              className="text-xl lg:text-3xl tracking-wide text-black"
              style={{
                fontFamily: "ui-serif",
                fontWeight: 800,
              }}
            >
              {data?.[0]?.category?.category_name}
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
            className="grid lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {/* LEFT BAR */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <LeftBar />
            </motion.div>

            {/* RIGHT SECTION */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="col-span-4 lg:col-span-3 sm:p-5 p-2"
            >
              <RightSection ProductData={data?.[0]?.products} />
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
