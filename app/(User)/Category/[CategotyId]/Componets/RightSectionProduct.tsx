"use client";

import CardModel from "@/app/(User)/Component/ProductList/CardModel";
import { FaFilter } from "react-icons/fa";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/Context";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useMemo, useState } from "react";
import EmptyTableComponent from "./EmptyTableComponet";

interface RightSectionProps {
  ProductData: any[];
}

export default function RightSection({ ProductData = [] }: RightSectionProps) {
  const { onOpen } = UsePanel();
  const [sort, setSort] = useState("Featured");

  const filterDataOption = [
    "Featured",
    "Best selling",
    "A → Z",
    "Z → A",
    "Price: Low → High",
    "Price: High → Low",
    "Newest First",
    "Oldest First",
  ];

  // ===== SORT LOGIC =====
  const sortedProducts = useMemo(() => {
    if (!ProductData || ProductData.length === 0) return [];

    const data = [...ProductData];

    switch (sort) {
      case "A → Z":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "Z → A":
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case "Price: Low → High":
        return data.sort((a, b) => a.price - b.price);
      case "Price: High → Low":
        return data.sort((a, b) => b.price - a.price);
      case "Newest First":
        return data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "Oldest First":
        return data.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return data;
    }
  }, [ProductData, sort]);

  return (
    <section className="w-full">
      {/* ===== TOP BAR ===== */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-6">
        {/* MOBILE FILTER BUTTON */}
        <Button
          onPress={onOpen}
          className="sm:hidden flex items-center justify-center gap-2 w-full h-11 border border-gray-300 bg-white text-[12px] tracking-[0.25em] font-medium rounded-lg hover:border-gray-800 transition-all duration-300 shadow-sm"
        >
          <FaFilter size={13} />
          FILTER
        </Button>

        {/* SORT SELECT */}
        <div className="relative w-full sm:w-[240px] ml-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none w-full h-11 bg-white border border-gray-300 pl-4 pr-10 rounded-lg text-[13px] tracking-wide font-medium text-gray-900 focus:outline-none focus:border-gray-800 transition-all duration-300 shadow-sm"
          >
            {filterDataOption.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <RiArrowDropDownLine
            size={22}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* ===== PRODUCT GRID / EMPTY STATE ===== */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:gap-x-8 lg:gap-y-10 mb-10">
          <CardModel DataObj={sortedProducts} CustomWH="w-full" className="hover:scale-[1.03] transition-transform duration-300 shadow-md hover:shadow-xl rounded-xl" />
        </div>
      ) : (
        <EmptyTableComponent />
      )}
    </section>
  );
}
