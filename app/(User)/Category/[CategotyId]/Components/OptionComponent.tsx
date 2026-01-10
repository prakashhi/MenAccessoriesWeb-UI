"use client";

import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

import { StateMobileDrawer } from "./MobileFilterDrawer";
import { UsePanel } from "@/context/Context";

export default function OptionComponent({
  setState,
  state,
}: {
  setState: React.Dispatch<React.SetStateAction<StateMobileDrawer>>;
  state: StateMobileDrawer;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const { CateMateListState, setMenProductFilter } = UsePanel();

  const toggle = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sections = [
    {
      title: "Materials",
      items: CateMateListState.Material,
    },
    {
      title: "Category",
      items: CateMateListState.MenCategory,
    },
  ];

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
  const { CateMateListState, setMenProductFilter, menProductFilter } =
    UsePanel();

  const [checked, setChecked] = useState({
    MaterialIds: menProductFilter.materialIds as string[],
    CategoryIds: menProductFilter.categoryIds as string[],
  });

  const handleCheck = (type: "Materials" | "Category", itemId: string) => {
    console.log(type, itemId);
    setMenProductFilter((prev) => {
      if (type === "Materials") {
        const materialIds = prev.materialIds ?? [];

        return {
          ...prev,
          materialIds: materialIds.includes(itemId)
            ? materialIds.filter((id) => id !== itemId)
            : [...materialIds, itemId],
        };
      }

      if (type === "Category") {
        const categoryIds = prev.categoryIds ?? [];

        return {
          ...prev,
          categoryIds: categoryIds.includes(itemId)
            ? categoryIds.filter((id) => id !== itemId)
            : [...categoryIds, itemId],
        };
      }

      return prev;
    });

    console.log("List", menProductFilter);
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
                      checked={
                        title === "Materials"
                          ? menProductFilter.materialIds?.includes(item.id) ??
                            false
                          : menProductFilter.categoryIds?.includes(item.id) ??
                            false
                      }
                      onChange={() => handleCheck(title, item.id)}
                      className="peer absolute opacity-0 w-6 h-6 cursor-pointer"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
    ${
      title === "Materials"
        ? menProductFilter.materialIds?.includes(item.id)
        : menProductFilter.categoryIds?.includes(item.id)
        ? "bg-black border-black"
        : "bg-white border-gray-300"
    }
  `}
                    >
                      {(title === "Materials"
                        ? menProductFilter.materialIds?.includes(item.id)
                        : menProductFilter.categoryIds?.includes(item.id)) && (
                        <svg
                          className="w-3 h-3 text-white"
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
