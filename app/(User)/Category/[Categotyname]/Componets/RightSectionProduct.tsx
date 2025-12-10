"use client";

import CardModel from "@/app/Component/ProductList/CardModel";
import { ProductData } from "@/app/Component/ProductList/ProductData";
import { useCallback, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";

export default function RightSection({
  CategoryName,
}: {
  CategoryName: string;
}) {
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

  const [categotyList, setCategotyList] = useState<any[]>([]);
  const { onOpen } = UsePanel();

  const getData = useCallback(() => {
    const res = ProductData.filter((val) => val.category === CategoryName);
    setCategotyList(res);
  }, [CategoryName]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="col-span-3">
        {/* ---- TOP FILTER BAR ---- */}
        <div className="flex gap-3 items-center justify-between lg:justify-end w-full px-3 lg:px-5 py-4">
          {/* MOBILE FILTER BUTTON */}
          <Button
            onPress={onOpen}
            className="border lg:hidden flex gap-2 items-center w-full border-gray-200 bg-white py-2 rounded-md shadow-sm"
          >
            <FaFilter />
            <span>Filter</span>
          </Button>

          {/* SORT SELECT */}
          <select
            className="
           lg:w-1/5 w-full
              border border-gray-200 py-3 px-4 rounded-md
              text-sm shadow-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-black
            "
          >
            {filterDataOption.map((val) => (
              <option key={val} className="text-sm bg-white">
                {val}
              </option>
            ))}
          </select>
        </div>

        {/* ---- PRODUCT GRID ---- */}
        {categotyList[0]?.products?.length ? (
          <div
            className="
              grid 
              grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 
              gap-4 sm:gap-6 lg:gap-8 
               sm:px-4 
              duration-300
            "
          >
            <CardModel
              category={CategoryName}
              CustomWH="
                hover:shadow-xl hover:scale-[1.03] transition duration-500 ease-in-out
                w-full h-auto bg-white rounded-xl overflow-hidden
                shadow-md   cursor-pointer
              "
              DataObj={categotyList[0].products}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center my-10">
            <span className="font-semibold text-gray-600 text-lg">
              No Products Available
            </span>
          </div>
        )}
      </div>
    </>
  );
}
