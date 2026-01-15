"use client";

import CardModel from "@/Component/ProductList/CardModel";
import { motion } from "framer-motion";
import { UsePanel } from "@/context/Context";
import { useEffect, useMemo, useRef, useState } from "react";
import EmptyTableComponent from "./EmptyTableComponents";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { Data } from "@/Type/Types";
import { CartItem } from "@/Type/CartType";
import { LikeProductType } from "@/Type/LikeType";
import { getUserFromStorage } from "@/context/utils";
import { useParams } from "next/navigation";
import { useUserLike } from "@/context/UserLikeContext";
import { useUserCart } from "@/context/UserCartContext";
import { TbAlphabetLatin } from "react-icons/tb";
import { useInfiniteProductsOffset } from "@/app/(User)/collection/Component/infinityScrollProduct";

import { ProductSkeletonGrid } from "@/app/(User)/collection/Component/Skeleton";

export default function RightSection() {
  const params = useParams();
  const userData = useMemo(() => getUserFromStorage(), []);
  const { onOpen } = UsePanel();

  const { CartProductList } = useUserCart();

  const { menProductFilter, setMenProductFilter } = UsePanel();

  const [sort, setSort] = useState("Featured");

  const { LikeProductList } = useUserLike();

  const [state, setState] = useState<Data>({
    LikeData: {},
    CartData: {},
  });

  const filterDataOption = [
    { label: "Featured" },
    // { label: "Best selling", icon: FiTrendingUp },
    { label: "A → Z", icon: TbAlphabetLatin },
    { label: "Z → A", icon: TbAlphabetLatin },
    { label: "Price: Low → High" },
    { label: "Price: High → Low" },
    { label: "Newest First" },
    { label: "Oldest First" },
  ];

  useEffect(() => {
    if (!sort) return;

    setMenProductFilter((prev) => {
      switch (sort) {
        case "Price: Low → High":
          return { ...prev, sortBy: "price", sortOrder: "asc" };

        case "Price: High → Low":
          return { ...prev, sortBy: "price", sortOrder: "desc" };

        case "Newest First":
          return { ...prev, sortBy: "createdAt", sortOrder: "desc" };

        case "Oldest First":
          return { ...prev, sortBy: "createdAt", sortOrder: "asc" };

        case "A → Z":
          return { ...prev, sortBy: "alphabetical", sortOrder: "asc" };
        case "Z → A":
          return { ...prev, sortBy: "alphabetical", sortOrder: "desc" };
        default:
          return prev;
      }
    });
  }, [sort]);

  useEffect(() => {
    const MetaData = async () => {
      if (userData) {
        const [category, like] = await Promise.allSettled([
          CartProductList(userData.id),
          LikeProductList(userData.id),
        ]);

        let cartData =
          category.status === "fulfilled" ? category.value.data ?? [] : [];
        let likeData = like.status === "fulfilled" ? like.value.data ?? [] : [];

        const cartMap: Record<string, CartItem> = {};
        cartData.forEach((item: CartItem) => {
          cartMap[item.product.productId] = item;
        });

        const likeMap: Record<string, LikeProductType> = {};
        likeData.forEach((item: LikeProductType) => {
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

  useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);

    return () => clearTimeout(t);
  }, [menProductFilter.sortBy, menProductFilter.sortOrder]);

  const { fetchProducts, products, hasMore, loading, totalProduct } =
    useInfiniteProductsOffset();

  const ProductData = products;

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          fetchProducts();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [fetchProducts, hasMore, ProductData.length]);

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
      <div
        className="  sticky 
  lg:top-18  top-14
  z-30 py-5
  bg-white/90
  backdrop-blur
  border-b
  border-gray-100"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="text-sm text-gray-600 font-light">
            {totalProduct} <span className="text-gray-400">products</span>
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
                className="w-full  px-4 cursor-pointer py-2.5 bg-white border border-gray-200 text-sm font-medium rounded-lg appearance-none focus:outline-none focus:border-gray-800 transition-colors pr-10"
              >
                {filterDataOption.map((option) => (
                  <option
                    key={option.label}
                    className="cursor-pointer"
                    value={option.label}
                  >
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
      <div className="p-4 sm:p-6">
        {ProductData.length > 0 ? (
          <>
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
        lg:gap-6"
            >
              <CardModel
                CustomWH="
                  min-w-[300px]
                  sm:min-w-[260px]
                  md:min-w-[300px]
                  lg:min-w-[320px]
                "
                DataObj={ProductData}
                setState={setState}
                Data={state}
                isUser={userData ? true : false}
              />
            </motion.div>

            <div ref={bottomRef} className="h-10" />
          </>
        ) : loading && ProductData.length > 0 ? (
          <ProductSkeletonGrid count={8} />
        ) : (
          <div className="flex items-center justify-center min-h-[70vh]">
            <EmptyTableComponent />
          </div>
        )}
        {totalProduct === products.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-16 px-4"
          >
            <div className="w-full max-w-lg">
              {/* Gradient Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent mb-6" />

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-gray-700">
                  End of Collection
                </p>
                <p className="text-xs text-gray-400 text-center">
                  That’s everything we have for now
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {loading && ProductData.length > 0 && <ProductSkeletonGrid count={8} />}
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
