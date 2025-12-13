"use client";

import CardModel from "@/app/(User)/Component/ProductList/CardModel";
import { FaFilter } from "react-icons/fa";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { RiArrowDropDownLine } from "react-icons/ri";

interface RightSectionProps {
  ProductData: any[];
}

export default function RightSection({ ProductData }: RightSectionProps) {
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

  const { onOpen } = UsePanel();
  console.log(ProductData);

  return (
    <div className="w-full mb-10">
      {/* ---- TOP FILTER BAR ---- */}

      <div
        className="
    flex flex-col lg:flex-row gap-4
    items-stretch lg:items-center justify-between
    w-full px-4 lg:px-6 py-4
    bg-white 
    rounded-2xl
  "
      >
        {/* MOBILE FILTER BUTTON */}
        <Button
          onPress={onOpen}
          className="
      lg:hidden
      flex items-center justify-center gap-3
      w-full
      bg-white
      border border-[#DADADA]
      py-3 rounded-xl
      text-sm tracking-wide font-medium
      hover:border-black transition
    "
        >
          <FaFilter size={14} />
          FILTER
        </Button>

        {/* SORT SELECT */}
        <div className="relative w-full sm:w-1/2 lg:w-[260px]">
          <select
            className="
        appearance-none w-full
        bg-white
        border border-[#DADADA]
        py-3 pl-4 pr-10
        rounded-xl
        text-sm tracking-wide font-medium
        text-[#111]
        focus:outline-none
        focus:border-black
        transition
      "
          >
            {filterDataOption.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          {/* DROPDOWN ICON */}
          <RiArrowDropDownLine
            size={22}
            className="
        absolute right-3 top-1/2 -translate-y-1/2
        text-[#666]
        pointer-events-none
      "
          />
        </div>
      </div>

      {/* ---- PRODUCT GRID ---- */}
      {ProductData  ? (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6 md:gap-8 xl:gap-10
            mt-8
          "
        >
          <CardModel
            DataObj={ProductData}
            CustomWH="w-full" // ✅ IMPORTANT
          />
        </div>
      ) : (
        <div className="flex justify-center items-center my-20">
          <span className="font-semibold text-gray-500 text-lg">
            No Products Available
          </span>
        </div>
      )}
    </div>
  );
}
