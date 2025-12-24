"use client";

import CardModel from "@/app/(User)/Component/ProductList/CardModel";
import { motion } from "framer-motion";
import { UsePanel } from "@/context/Context";
import { useEffect, useMemo, useState } from "react";
import EmptyTableComponent from "./EmptyTableComponet";
import {
  FiFilter,
  FiChevronDown,
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiStar,
} from "react-icons/fi";
import { TbAlphabetLatin } from "react-icons/tb";

import {
  Data,
  ProductInfoType,
  CartItem,
  LikeProductType,
} from "@/app/(User)/Type/Types";
import { getUserFromStorage } from "@/context/utils";

interface RightSectionProps {
  ProductData: any[];
}

export default function RightSection({ ProductData = [] }: RightSectionProps) {
  const userData = useMemo(() => getUserFromStorage(), []);
  const { onOpen, CartProductList, LikeProductList } = UsePanel();
  const [sort, setSort] = useState("Featured");

  const [state, setState] = useState<Data>({
    LikeData: {},
    CartData: {},
  });

  const filterDataOption = [
    { label: "Featured", icon: FiStar },
    { label: "Best selling", icon: FiTrendingUp },
    { label: "A → Z", icon: TbAlphabetLatin },
    { label: "Z → A", icon: TbAlphabetLatin },
    { label: "Price: Low → High", icon: FiDollarSign },
    { label: "Price: High → Low", icon: FiDollarSign },
    { label: "Newest First", icon: FiClock },
    { label: "Oldest First", icon: FiClock },
  ];

  const sortedProducts = useMemo(() => {
    if (!ProductData || ProductData.length === 0) return [];
    const data = [...ProductData];

    switch (sort) {
      case "A → Z":
        return data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "Z → A":
        return data.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
      case "Price: Low → High":
        return data.sort(
          (a, b) => (a.sellingPrice || 0) - (b.sellingPrice || 0)
        );
      case "Price: High → Low":
        return data.sort(
          (a, b) => (b.sellingPrice || 0) - (a.sellingPrice || 0)
        );
      case "Newest First":
        return data.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
      case "Oldest First":
        return data.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );
      default:
        return data;
    }
  }, [ProductData, sort]);

  useEffect(() => {
    const MetaData = async () => {
      if (userData) {
        const [category, like] = await Promise.all([
          CartProductList(userData.id),
          LikeProductList(userData.id),
        ]);

        const cartMap: Record<string, CartItem> = {};
        category.data.forEach((item: CartItem) => {
          cartMap[item.product.productId] = item;
        });

        const likeMap: Record<string, LikeProductType> = {};
        like.data.forEach((item: LikeProductType) => {
          likeMap[item.product.id] = item;
        });

        setState((prev) => ({
          ...prev,
          LikeData: likeMap,
          CartData: cartMap,
        }));
      }
    };
    MetaData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* ===== CONTROL BAR ===== */}
      <div className="sticky top-30 z-20 bg-white border-b border-gray-100 py-3 px-4 sm:px-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="text-sm text-gray-600 font-light">
            {sortedProducts.length}{" "}
            <span className="text-gray-400">products</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile Filter Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="flex cursor-pointer sm:hidden items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-lg flex-1"
            >
              <FiFilter size={14} />
              FILTER
            </motion.button>

            {/* Desktop Filter Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpen}
              className="hidden cursor-pointer sm:flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-lg hover:border-gray-800 transition-colors"
            >
              <FiFilter size={14} />
              FILTERS
            </motion.button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-none min-w-[200px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 cursor-pointer py-2.5 bg-white border border-gray-200 text-sm font-medium rounded-lg appearance-none focus:outline-none focus:border-gray-800 transition-colors pr-10"
              >
                {filterDataOption.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FiChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <div className="p-4 sm:p-6 flex justify-center">
        {sortedProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        sm:gap-5
        lg:gap-6
       
        
      "
          >
            <CardModel
              CustomWH="
                  min-w-[300px]
                  sm:min-w-[260px]
                  md:min-w-[300px]
                  lg:min-w-[320px]
                "
              DataObj={sortedProducts}
              setState={setState}
              Data={state}
              isUser={userData ? true : false}
            />
          </motion.div>
        ) : (
          <div className="flex items-center justify-center min-h-[70vh]">
            <EmptyTableComponent />
          </div>
        )}
      </div>

      {/* Mobile Filter FAB */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpen}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-xl z-50"
      >
        <FiFilter size={20} />
      </motion.button>
    </motion.section>
  );
}
