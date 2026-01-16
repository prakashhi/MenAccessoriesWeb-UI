"use client";

import { useEffect, useState } from "react";
import SearchDataInfo from "@/Component/NavBar/Component/SearchDataInfo";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Suspense } from "react";

import { UsePanel } from "@/context/Context";

import { menCategoryId } from "@/app/page";
import { menProductListType } from "@/Type/Types";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function SearchInput({ onClose }: { onClose: () => void }) {
  return (
    <Suspense fallback={null}>
      <Search onClose={onClose} />
    </Suspense>
  );
}

export function Search({ onClose }: { onClose: () => void }) {
  const searchParams = useSearchParams();
  const { MenCategoryList, setMenProductFilter } = UsePanel();

  const searchRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const query = searchParams.get("query") ?? "";

  const [searchData, setSearchData] = useState<menProductListType | null>(null);
  const [searchWord, setSearchWord] = useState("");

  const SearchProduct = async (words: string) => {
    if (!words) return;

    let res = await MenCategoryList({
      keyword: words,
      categoryIds: menCategoryId,
      maxPrice:0
    });
    setSearchData(res.data);
  };

  useEffect(() => {
    if (query) {
      setSearchWord(query);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchData(null); // hide dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      SearchProduct(searchWord.trim());
      setMenProductFilter((prev) => ({ ...prev, keyword: searchWord.trim() }));
    }, 350);

    return () => clearTimeout(delay);
  }, [searchWord]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchWord.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchWord)}`);
    }
  };

  return (
    <>
      <motion.div
        ref={searchRef}
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
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={handleEnter}
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
        {searchWord && searchData && searchData.total > 0 && (
          <div className="relative z-50 mt-3 w-full">
            <SearchDataInfo Data={searchData} />
          </div>
        )}
      </motion.div>
    </>
  );
}
