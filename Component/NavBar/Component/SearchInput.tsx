"use client";

import { useEffect, useMemo, useState } from "react";
import { useApi } from "@/app/useApi";

import SearchDataInfo from "@/Component/NavBar/Component/SearchDataInfo";
import { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { Data } from "@/Type/Types";
import { LikeProductType } from "@/Type/LikeType";
import { CartItem } from "@/Type/CartType";

import { getUserFromStorage } from "@/context/utils";
import { UsePanel } from "@/context/Context";
import { useUserLike } from "@/context/UserLikeContext";
import { useUserCart } from "@/context/UserCartContext";

const pageFade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const sectionFade: Variants = {
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

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function SearchInput({ onClose }: { onClose: () => void }) {
  const userData = useMemo(() => getUserFromStorage(), []);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const { callApi } = useApi();

  const SearchProduct = async (words: string) => {
    if (!words) return;

    const res = await callApi(
      "get",
      `/rockroars/product-search-response?keyword=${words}`
    );

    setSearchData(res);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      SearchProduct(searchWord);
    }, 450);

    return () => clearTimeout(delay);
  }, [searchWord]);

  const handleEnter = () =>
  {
    
  }

  return (
    <>
      <>
        {/* BACKDROP */}
        {/* SEARCH CONTENT */}

        <motion.div
          className="relative w-full lg:w-[800px]"
          initial={{
            opacity: 0,
            y: -14,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.75, // slower
            delay: 0.05, // subtle pause
            ease: [0.16, 1, 0.3, 1], // ultra-smooth luxury curve
          }}
        >
          <div
            className="
      relative
      w-full
      rounded-full
      bg-white/70 backdrop-blur-xl
      border border-black/10
      shadow-[0_18px_50px_rgba(0,0,0,0.06)]
      transition-all duration-500 ease-out
      focus-within:border-black/30
      focus-within:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
    "
          >
            {/* SEARCH ICON */}
            <span
              className="
        absolute left-4 sm:left-5
        top-1/2 -translate-y-1/2
        text-black/40
      "
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </span>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Search"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value.trim())}
              className="
        w-full
        bg-transparent
        rounded-full
        py-3 sm:py-2.5
        pl-11 sm:pl-12
        pr-10
        text-[12px] sm:text-[13px]
       
        text-black
        placeholder-black/40
        focus:outline-none
      "
            />

            {/* CLOSE ICON */}

            <button
              onClick={() => onClose()}
              className="
          absolute right-4 cursor-pointer lg:px-0 px-2 sm:right-5
          top-1/2 -translate-y-1/2
          text-black/40
          hover:text-black
          transition
        "
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          </div>

          {/* RESULT DROPDOWN */}
          {searchWord && searchData && (
            <div className="relative z-50 mt-3 w-full">
              <SearchDataInfo Data={searchData} />
            </div>
          )}
        </motion.div>
      </>
    </>
  );
}
