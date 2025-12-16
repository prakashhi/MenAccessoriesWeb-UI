"use client";

import Nav from "../Component/NavBar/Nav";
import Link from "next/link";
import CardModel from "../Component/ProductList/CardModel";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/app/useApi";
import { notify } from "../Component/ToastComponent";
import SearchDataInfo from "./Componets/SearchDataInfo";
import { motion } from "framer-motion";

/* ------------------ ANIMATION VARIANTS ------------------ */

const pageFade = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const sectionFade = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* ------------------ PAGE ------------------ */

export default function Page() {
  const [categoryNameList, setCategoryNameList] = useState<any[]>([]);
  const [suggestProduct, setSuggestProduct] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const { callApi } = useApi();

  /* ------------------ API CALLS ------------------ */

  const GetCategoryName = useCallback(async () => {
    const response = await callApi(
      "get",
      "http://localhost:3005/product/subcategories?id=cfe77101-77f5-4811-9cdc-186ba9af9279&page=1&limit=100"
    );

    if (response?.error) {
      notify({
        message: response.message || "Something went wrong!",
        type: "error",
      });
      return;
    }

    setCategoryNameList(response.data || []);
  }, [callApi]);

  const GetSuggestProduct = useCallback(async () => {
    const response = await callApi("get", "/9rock/cat-with-products");

    if (response?.error) {
      notify({
        message: response.message || "Something went wrong!",
        type: "error",
      });
      return;
    }

    setSuggestProduct(response?.data?.[0]?.products || []);
  }, [callApi]);

  const SearchProduct = async (words: string) => {
    if (!words) return;

    const res = await callApi(
      "get",
      `/product-search-response?keyword=${words}`
    );

    if (res?.success !== true) {
      notify({
        message: res.message || "Something went wrong!",
        type: "error",
      });
      return;
    }

    setSearchData(res);
  };

  /* ------------------ EFFECTS ------------------ */

  useEffect(() => {
    const delay = setTimeout(() => {
      SearchProduct(searchWord);
    }, 450);

    return () => clearTimeout(delay);
  }, [searchWord]);

  useEffect(() => {
    GetCategoryName();
    GetSuggestProduct();
  }, []);

  /* ------------------ UI ------------------ */

  return (
    <>
      <Nav />

      <motion.main
        variants={pageFade}
        initial="hidden"
        animate="show"
        className="mx-auto px-4 sm:px-6 lg:px-16 py-10"
      >
        {/* ---------------- SEARCH SECTION ---------------- */}
        <motion.section
          variants={sectionFade}
          initial="hidden"
          animate="show"
          className="bg-white rounded-3xl border border-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-5 sm:p-6 lg:p-8 space-y-8"
        >
          {/* SEARCH INPUT */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, categories"
              className="w-full rounded-full border border-gray-300 py-3.5 pl-12 pr-4 text-sm tracking-wide text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
              onChange={(e) => setSearchWord(e.target.value.trim())}
            />

            {searchWord && searchData && (
              <SearchDataInfo Data={searchData} />
            )}
          </div>

          {/* ---------------- CATEGORIES ---------------- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4"
          >
            {categoryNameList.map((val, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Link
                  href={`/Category/${val.id}`}
                  className="rounded-xl w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] lg:text-sm sm:text-xs md:text-sm py-3 px-2 text-center transition-all duration-300 tracking-widest font-medium"
                >
                  {val.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ---------------- SUGGESTED PRODUCTS ---------------- */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 space-y-8"
        >
          <h2
            className="text-center text-xl sm:text-2xl lg:text-xl text-gray-800 font-medium tracking-[0.3em]"
            style={{ fontFamily: "ui-serif, Georgia, serif" }}
          >
            SUGGESTED PRODUCTS
          </h2>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="snap-start flex flex-row gap-3 shrink-0"
            >
              <CardModel
                DataObj={suggestProduct}
                CustomWH="w-56 sm:w-64 md:w-72 h-[360px] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              />
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
    </>
  );
}
