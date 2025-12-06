"use client";
import CardModel from "@/app/Component/ProductList/CardModel";
import { ProductData } from "@/app/Component/ProductList/ProductData";
import { useCallback, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { Select, SelectSection, SelectItem } from "@heroui/select";

export default function RightSection({
  CategoryName,
}: {
  CategoryName: string;
}) {
  const filterDataOption = [
    "Sort",
    "Featured",
    "Best selling",
    "Alphabetically, A-Z",
    "Date, new to old",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to new",
  ];

  const [categotyList, setCategotyList] = useState([]);
  const { onOpen } = UsePanel();

  const getData = useCallback(() => {
    let res = ProductData.filter((val) => val.category == CategoryName);
    setCategotyList(res);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="col-span-3 ">
        <div className="flex gap-3  lg:justify-end justify-between justify-items-center w-full items-center lg:p-5 px-2 py-3">
          <Button
            onPress={onOpen}
            className="border lg:hidden  flex flex-row items-center justify-between w-full border-gray-100 px-2  py-3 rounded-sm "
          >
            <FaFilter />
            <span className="">Filter</span>
          </Button>

          <select className="border border-gray-100 p-3 rounded-md" name="" id="">
            {filterDataOption &&
              filterDataOption.map((val: string, index: number) => (
                <option className="bg-gray-50 px-4 py-3 max-w-xs" key={val}>
                  {val}
                </option>
              ))}
          </select>
          {/* <Select
            label=""
            variant="bordered"
            className={" border border-gray-100 max-w-xs px-4 py-3 rounded-md"}
            name="sort"
            defaultSelectedKeys={["Featured"]}
          >
            {filterDataOption &&
              filterDataOption.map((val: string, index: number) => (
                <SelectItem className="bg-gray-50 px-4 py-3 max-w-xs" key={val}>
                  {val}
                </SelectItem>
              ))}
          </Select> */}
        </div>

        <div className="grid lg:grid-cols-3  justify-items-center  grid-cols-2 max-h-screen overflow-y-auto  transition duration-500 ease-out    w-full">
          <CardModel
            CustomWH={
              "hover:shadow-xl hover:scale-105 transition  duration-500 ease-in-out  sm:w-86 sm:h-74 md:w-98  lg:w-84 w-46  h-75  shrink-0  sm:h-64 md:h-[500px] lg:m-3  flex flex-col lg:gap-3 cursor-pointer m-1 shadow mt-10"
            }
            DataObj={categotyList[0]?.products}
          />
        </div>
      </div>
    </>
  );
}
