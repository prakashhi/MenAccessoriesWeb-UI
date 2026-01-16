"use client";

import Link from "next/link";
import CardModel from "./CardModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UsePanel } from "@/context/Context";
import { getUserFromStorage } from "@/context/utils";
import { Data, CateLogResponse } from "@/Type/Types";
import { LikeProductType } from "@/Type/LikeType";

import { CartItem } from "@/Type/CartType";
import Image from "next/image";
import { ImageShowUtil } from "@/utils/ImageShowUtil";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { getProductId } from "@/utils/getProductId";
import { useUserLike } from "@/context/UserLikeContext";
import { useUserCart } from "@/context/UserCartContext";
import { notify } from "../ToastComponent";

import ImageCarousel from "../Header/Component/ImageCarousel";
import { AboutUsComponent } from "@/Component/Header/Component/About-us";
import WhyChooseUs from "@/Component/Header/Component/WhyChooseUs";

export default function Product() {
  const { setUserCountData, refreshKey, user, CateLogProducts } = UsePanel();
  const userData = useMemo(() => getUserFromStorage(), [user]);
  const { LikeProductList } = useUserLike();

  const { CartProductList } = useUserCart();

  const router = useRouter();

  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );

  const [product, setProduct] = useState<CateLogResponse[]>([]);

  const [state, setState] = useState<Data>({
    LikeData: {},
    CartData: {},
  });

  const getData = useCallback(async () => {
    try {
      let res = await CateLogProducts();

      if (res.success == true && res.data) {
        setProduct(res.data);
      }

      if (userData) {
        const [cart, like] = await Promise.allSettled([
          CartProductList(userData.id),
          LikeProductList(userData.id),
        ]);

        const LikeData =
          like.status == "fulfilled" ? like.value?.data ?? [] : [];
        const CartData =
          cart.status == "fulfilled" ? cart.value?.data ?? [] : [];

        const cartMap: Record<string, CartItem> = {};

        CartData.forEach((item: CartItem) => {
          cartMap[item.product.productId] = item;
        });

        const likeMap: Record<string, LikeProductType> = {};

        LikeData.forEach((item: LikeProductType) => {
          const id = getProductId(item.product);
          likeMap[id] = item;
        });

        setState((prev) => ({
          ...prev,
          LikeData: likeMap,
          CartData: cartMap,
        }));

        setUserCountData((prev) => ({
          ...prev,
          LikeCount: LikeData.length,
          CartCount: CartData.length,
        }));
      }
    } catch (err: any) {
      notify({
        message: err.message,
        type: "error",
      });
    }
  }, [user]);

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

  useEffect(() => {
    getData();
  }, [refreshKey]);

  return (
    <>
      <ImageCarousel />
      <AboutUsComponent />
      <section className="pt-12 lg:pt-39 px-4 lg:overflow-x-hidden sm:px-6 md:px-10 lg:px-16 bg-[#FAFAFA]">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center  sm:mb-10"
          >
            <h2
              className="lg:text-3xl text-xl flex text-blue-950 items-center flex-col mb-20   lg:mb-10"
              style={{ fontFamily: "ui-serif, serif", fontWeight: 800 }}
            >
              Explore Collection
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="h-px bg-black mt-2 opacity-60"
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
    lg:mb-20 mb-10
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
                  href={`/category/${categoryItem.id}`}
                  className="
    hidden lg:inline-flex
    items-center justify-center
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
                      router.replace(`/category/${categoryItem.id}`);
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

                      <span className="text-white/80 text-sm mb-2">
                        {categoryItem.noOfProducts} Products
                      </span>

                      {/* MOBILE VIEW ALL BUTTON */}
                      <button
                        className="
        md:hidden
        self-start
        mt-1
        px-4 py-1.5
        text-xs tracking-widest font-semibold
        border border-white text-white
        rounded-full
        hover:bg-white hover:text-black
        transition-all duration-300
      "
                      >
                        VIEW ALL
                      </button>
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
                          categoryName={categoryItem.name}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* view all collection */}

        <motion.div
          className="flex justify-center mt-0 lg:mt-14"
        >
          <Link
            href="/collection"
            className="group relative inline-flex items-center gap-3 px-8 py-3 lg:px-8 lg:py-4 rounded-full
      bg-black text-white text-sm sm:text-base font-medium
      overflow-hidden hover:bg-gray-900 transition"
          >
            <span className="relative z-10 lg:text-md text-xs">
              View All Collections
            </span>
            {/* <ArrowRight
                size={20}
                className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300"
              /> */}
          </Link>
        </motion.div>
      </section>

      <WhyChooseUs />
    </>
  );
}
