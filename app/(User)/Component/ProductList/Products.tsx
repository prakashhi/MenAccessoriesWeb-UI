"use client";

import { ProductData } from "./ProductData";
import Link from "next/link";
import CardModel from "./CardModel";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/app/useApi";
import { notify } from "../ToastComponent";



export default function Product() {
  const { callApi } = useApi();

  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const MenData = await callApi("get", "https://backend.yugsingh.com/9rock/cat-with-products");
    if (MenData?.error) {
      notify({
        message: MenData?.message || "SomeThing is wrong!",
        type: "error",
      });
      return;
    }
    setData(MenData?.data);
  }, []);

  useEffect(() => {
    getData();
  }, []);


  return (
    <section className="pt-12 lg:pt-24 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#FAFAFA]">
      {data.length > 1 &&
        data.map((categoryItem, index) => (
          <div
            key={index}
            className="mb-20 animate-fadeUp"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {/* CATEGORY HEADER */}
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-end mb-8">
              <div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight"
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

            {/* PRODUCTS SCROLL */}
            <div className="relative">
              {/* Scroll Fade Effect */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

              <div
                className="
                flex gap-5
                overflow-x-auto scrollbar-hide
                pb-6
                scroll-smooth
                snap-x snap-mandatory
                overscroll-x-contain
                [&>*]:snap-start
              "
              >
                <CardModel
                  DataObj={categoryItem.products}
                  CustomWH="
                  min-w-[220px]
                  sm:min-w-[260px]
                  md:min-w-[300px]
                  lg:min-w-[320px]
                "
                />
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}
