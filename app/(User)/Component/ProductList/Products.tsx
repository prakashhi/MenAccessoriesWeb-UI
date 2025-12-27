"use client";

import Link from "next/link";
import CardModel from "./CardModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/app/useApi";
import { UsePanel } from "@/context/Context";
import { getUserFromStorage } from "@/context/utils";
import {
  CartItem,
  VariantSize,
  LikeProductType,
  productCategoryList,
  ProductInfoType,
  CategoryInfo,
  Data,
} from "@/app/(User)/Type/Types";
import Image from "next/image";
import { ImageShowUtil } from "@/app/utils/ImageShowUtil";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

export default function Product() {
  const userData = useMemo(() => getUserFromStorage(), []);
  const { callApi } = useApi();

  const { LikeProductList, CartProductList } = UsePanel();

  const router = useRouter();

  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );

  const [product, setProduct] = useState<productCategoryList[]>([]);
  const [category, setCategory] = useState<CategoryInfo[]>([]);

  const [state, setState] = useState<Data>({
    LikeData: {},
    CartData: {},
  });

  const getData = useCallback(async () => {
    //Original Data
    let res = await callApi(
      "get",
      "https://backend.9rock.in/9rock/cat-with-products"
    );
    setProduct(res.data);

    // const [category, product] = await Promise.all([
    //   callApi(
    //     "get",
    //     `/product/category-list?page=1&limit=100&hideWithOutImage=false`
    //   ),
    //   callApi(
    //     "get",
    //     `/product-list?page=1&limit=100&sortOrder=desc&showInStockProducts=false`
    //   ),
    // ]);
    // if (userData) {
    //   const [category, like] = await Promise.all([
    //     CartProductList(userData.id),
    //     LikeProductList(userData.id),
    //   ]);
    //   const cartMap: Record<string, CartItem> = {};
    //   category.data.forEach((item: CartItem) => {
    //     cartMap[item.product.productId] = item;
    //   });
    //   const likeMap: Record<string, LikeProductType> = {};
    //   like.data.forEach((item: LikeProductType) => {
    //     likeMap[item.product.id] = item;
    //   });
    //   setState((prev) => ({
    //     ...prev,
    //     LikeData: likeMap,
    //     CartData: cartMap,
    //   }));
    // }
    // setCategory(category.data);
    // setProduct(product.data);
  }, []);

  const observeSection = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(index));
            observer.disconnect(); // trigger only once
          }
        },
        {
          threshold: 0.25, // 25% visible
        }
      );

      observer.observe(el);
    },
    []
  );

  // const groupedData = useMemo(() => {
  //   if (!category.length || !product.length) return [];

  //   return category.map((category) => ({
  //     ...category,
  //     products: product.filter((product) => product.categoryId === category.id),
  //   }));
  // }, [category, product]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="pt-12 lg:pt-49 px-4 lg:overflow-x-hidden sm:px-6 md:px-10 lg:px-16 bg-[#FAFAFA]">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-6 sm:mb-10"
        >
          <h2
            className="lg:text-3xl text-xl flex  items-center flex-col mb-20   lg:mb-10"
            style={{ fontFamily: "ui-serif, serif", fontWeight: 800 }}
          >
            Explore Collection
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="h-0.5 bg-black mt-2 opacity-60"
            />
          </h2>
        </motion.div>
      </div>
      {product?.length > 1 &&
        product.map((categoryItem, index) => (
          <div
            key={index}
            ref={observeSection(index)}
            className={`
    mb-20
    transition-all duration-700 ease-out
    ${
      visibleSections.has(index)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-12"
    }
  `}
          >
            {/* CATEGORY HEADER */}
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-end mb-8">
              <div>
                <h2
                  className="text-md sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight"
                  style={{ fontFamily: "ui-serif, serif" }}
                >
                  {categoryItem.name}
                </h2>
                <div className="w-14 h-0.5 bg-black mt-2 opacity-60" />
              </div>

              <Link
                href={`/Category/${categoryItem.id}`}
                className="
                inline-flex items-center justify-center
                px-6 py-2.5
                border border-black
                text-xs tracking-widest font-semibold
                rounded-full
                hover:bg-black hover:text-white
                transition-all duration-300
              "
              >
                VIEW ALL
              </Link>
            </div>

            <div className="relative">
              {/* RIGHT FADE */}

              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* CATEGORY IMAGE */}
                <div
                  onClick={() => {
                    console.log("clicked");
                    router.replace(`/Category/${categoryItem.id}`);
                  }}
                  className="group relative items-center
                    w-full lg:w-[300px] xl:w-[340px]
                    h-[200px] sm:h-[220px] lg:h-[420px]
                    shrink-0
                    rounded-2xl cursor-pointer
                    overflow-hidden
                    bg-gray-100"
                >
                  <Image
                    src={ImageShowUtil(categoryItem.image)}
                    alt={categoryItem.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 340px"
                    className="object-cover
          transition-transform duration-500 ease-out
          lg:group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div
                    className="
          absolute inset-0
          bg-black/40
          flex flex-col justify-end p-4
          opacity-100 lg:opacity-0
          lg:group-hover:opacity-100
          transition-opacity duration-300
        "
                  >
                    <h3 className="text-white text-lg sm:text-xl font-semibold">
                      {categoryItem.name}
                    </h3>
                    <span className="text-white/80 text-sm">
                      {categoryItem.noOfProducts} Products
                    </span>
                  </div>
                </div>

                {/* PRODUCTS SCROLL */}
                <div className="relative w-full max-w-full overflow-hidden">
                  <div
                    className="flex gap-4 sm:gap-5 w-full
                        max-w-full
                        overflow-x-auto
                        scrollbar-hide    
                        py-3
                        scroll-smooth
                        snap-x snap-mandatory
                        overscroll-x-contain
                        px-1
                     "
                  >
                    {visibleSections.has(index) && (
                      <CardModel
                        DataObj={categoryItem.products}
                        CustomWH="
                        snap-start
                        w-[320px]
                        sm:w-[280px]
                        lg:w-[300px]
                        xl:w-[320px]
                        shrink-0

                      "
                        Data={state}
                        setState={setState}
                        isUser={!!userData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}
