"use client";

import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useApi } from "@/app/useApi";
import { motion, AnimatePresence } from "framer-motion";

import { StateMobileDrawer } from "./MobileFilterDrawer";

export default function OptionComponent({
  setState,
  state,
}: {
  setState: React.Dispatch<React.SetStateAction<StateMobileDrawer>>;
  state: StateMobileDrawer;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const { callApi } = useApi();

  const [option, setOption] = useState({
    materials: [
      { name: "fusion", id: "dewrwe" },
      { name: "fusion", id: "dewrwefesrw" },
    ],
  });

  // useEffect(() => {
  //   const getFilterData = async () => {
  //     const [subCategoryRes, materialRes] = await Promise.all([
  //       // callApi(
  //       //   "get",
  //       //   `http://localhost:3005/product/subcategories?id=cfe77101-77f5-4811-9cdc-186ba9af9279&page=1&limit=100`
  //       // ),
  //       callApi("get", `http://localhost:3005/material-list?page=1&limit=10`),
  //     ]);

  //     // setState((prev) => ({
  //     //   ...prev,
  //     //   subCategories: subCategoryRes?.data,
  //     //   materials: materialRes?.data,
  //     // }));
  //   };

  //   getFilterData();
  // }, []);

  const toggle = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sections = [{ title: "Materials", items: option.materials }];

  const prices = [
    { label: "Under ₹5,000", min: 0, max: 5000 },
    { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
    { label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
    { label: "₹25,000+", min: 25000, max: null },
  ];

  return (
    <>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <AccordionSection
            key={index}
            index={index}
            title={section.title}
            items={section.items}
            open={!!open[index]}
            toggle={toggle}
            state={state}
            setState={setState}
          />
        ))}

        {/* ================= PRICE RANGE ================= */}
        <div className="px-5 lg:px-3 py-4 ">
          <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
            Price Range
          </h3>

          <div className="flex flex-col gap-2">
            {prices.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  setState((prev: StateMobileDrawer) => ({
                    ...prev,
                    minPrice: item.min,
                    maxPrice: item.max,
                    PriceLabel: item.label,
                  }))
                }
                className={`
          text-left
          px-3 cursor-pointer
          py-2
          border-1 border-gray-300
          rounded-md
          text-sm
          ${state.PriceLabel == item.label && `bg-gray-700 text-white`}
          hover:bg-black
          hover:text-white
          transition
        `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AccordionSection({
  index,
  title,
  items,
  open,
  toggle,
  state,
  setState,
}: any) {
  const handleCheck = (id: string) => {
    setState((prev: StateMobileDrawer) => ({ ...prev, malarialId: id }));
  };

  return (
    <>
      <div className="rounded-xl bg-white border border-[#EDEDED] shadow">
        {/* HEADER */}
        <button
          onClick={() => toggle(index)}
          className="w-full flex justify-between items-center px-4 py-4"
        >
          <span className="text-sm font-medium tracking-widest uppercase">
            {title}
          </span>
          <RiArrowDropDownLine
            size={24}
            className={`transition-transform cursor-pointer duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* CONTENT */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 pb-5 space-y-3"
            >
              {Array.isArray(items) &&
                items.map((item: any) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer relative"
                  >
                    <input
                      type="checkbox"
                      checked={state.malarialId == item.id}
                      onChange={() => handleCheck(item.id)}
                      className="peer cursor-pointer  absolute opacity-0 w-6 h-6"
                    />
                    <span
                      className={`w-6 cursor-pointer h-6 shrink-0 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300
                      ${
                        state.malarialId == item.id
                          ? "bg-black border-black"
                          : "bg-white"
                      }`}
                    >
                      {state.malarialId == item.id && (
                        <svg
                          className="w-4 cursor-pointer  h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </label>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
