"use client";

import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { UsePanel } from "@/context/Context";
import { usePathname } from "next/navigation";

export default function OptionComponent() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const { CateMateListState, setMenProductFilter, menProductFilter } =
    UsePanel();
  const [price, setPrice] = useState<number>(0);

  const toggle = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith("/category/");

  const sections = [
    {
      title: "Materials",
      type: "Materials",
      items: CateMateListState.Material ?? [],
    },
    ...(isCategoryPage
      ? []
      : [
          {
            title: "Category",
            type: "Category",
            items: CateMateListState.MenCategory ?? [],
          },
        ]),
  ];
  const prices = [
    { label: "Under ₹5,000", min: 0, max: 5000 },
    { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
    { label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
    { label: "₹25,000+", min: 25000, max: 999999999 },
  ];

  const maxLimit = 50000;

  const handlePriceChange = (min: number, max: number, label: string) => {
    setMenProductFilter((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      priceLabel: label,
    }));
  };

  // update price when slider moves
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));

    setMenProductFilter((prev) => ({
      ...prev,
      minPrice: 0,
      maxPrice: price,
    }));
  };

  const percentage = (price / maxLimit) * 100;

  const resetFilter = () => {
    setMenProductFilter({
      minPrice: 0,
      maxPrice: 0,
      priceLabel: "",
      categoryIds: [],
      materialIds: [],
    });
    setPrice(0);
  };
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
            type={section.type}
            toggle={toggle}
          />
        ))}

        {/* ================= PRICE RANGE ================= */}
        <div className="px-5 lg:px-3 py-4 ">
          <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
            Price
          </h3>

          <div className="flex flex-col gap-2">
            {prices.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  handlePriceChange(item.min, item.max, item.label)
                }
                className={`
          text-left
          px-3 cursor-pointer
          py-2
          border-1 border-gray-300
          rounded-md
          text-sm
      ${menProductFilter.priceLabel === item.label ? "bg-black text-white" : ""}
          hover:bg-gray-500
          hover:text-white
          transition
        `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* in Stock */}

        <label className="group flex items-center gap-3 cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 transition-all duration-200 hover:border-black hover:bg-gray-50">
          {/* Hidden checkbox */}
          <input
            type="checkbox"
            checked={menProductFilter.showInStockProducts} // controlled
            onChange={(e) =>
              setMenProductFilter((prev) => ({
                ...prev,
                showInStockProducts: e.target.checked,
              }))
            }
            className="peer absolute opacity-0 w-0 h-0"
          />

          {/* Custom checkbox */}
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all duration-200
      ${
        menProductFilter.showInStockProducts
          ? "bg-black border-black scale-105"
          : "bg-white border-gray-300 group-hover:border-black"
      }`}
          >
            {menProductFilter.showInStockProducts && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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

          {/* Label */}
          <span
            className={`text-sm transition-colors ${
              menProductFilter.showInStockProducts
                ? "text-black font-medium"
                : "text-gray-600 group-hover:text-black"
            }`}
          >
            In Stock Only
          </span>
        </label>

        {/* Price Sidler */}
        <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
          Price Range
        </h3>
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Slider */}
          <input
            type="range"
            min={0}
            max={maxLimit}
            value={price}
            onChange={handleChange}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #000 ${percentage}%, #e5e7eb ${percentage}%)`,
            }}
          />

          {/* Show current selected price */}
          <div className="text-sm text-gray-700">
            Selected Price: ₹{price === maxLimit ? `${maxLimit}+` : price}
          </div>
        </div>

        <button
          onClick={resetFilter}
          className="
    px-4 py-2
    bg-gray-100 
    text-gray-700
    rounded-lg 
    shadow-sm
    hover:bg-gray-200 
    hover:shadow-md
    transition 
     cursor-pointer
    duration-200
    font-medium
  "
        >
          Reset
        </button>
      </div>
    </>
  );
}

function AccordionSection({
  index,
  type,
  title,
  items,
  open,
  toggle,
}: {
  index: number;
  title: string;
  type: string;
  items: any[];
  open: boolean;
  toggle: (i: number) => void;
}) {
  const { setMenProductFilter, menProductFilter } = UsePanel();

  const isChecked = (id: string) =>
    type === "Materials"
      ? menProductFilter.materialIds?.includes(id)
      : menProductFilter.categoryIds?.includes(id);

  const handleCheck = (id: string) => {
    setMenProductFilter((prev) => {
      if (type === "Materials") {
        const materialIds = prev.materialIds ?? [];
        return {
          ...prev,
          materialIds: materialIds.includes(id)
            ? materialIds.filter((x) => x !== id)
            : [...materialIds, id],
        };
      }

      const categoryIds = prev.categoryIds ?? [];
      return {
        ...prev,
        categoryIds: categoryIds.includes(id)
          ? categoryIds.filter((x) => x !== id)
          : [...categoryIds, id],
      };
    });
  };

  return (
    <>
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <button
          onClick={() => toggle(index)}
          className="
      w-full flex justify-between items-center
      px-5 py-4
      transition-colors duration-200
      hover:bg-gray-50
    "
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-800">
            {title}
          </span>

          <RiArrowDropDownLine
            size={26}
            className={`transition-transform duration-300 cursor-pointer text-gray-500
        ${open ? "rotate-180 text-black" : ""}
      `}
          />
        </button>

        {/* subtle divider */}
        <div className="h-px bg-gray-100" />

        {/* CONTENT */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="px-5 pb-5 pt-4 space-y-2"
            >
              {Array.isArray(items) &&
                items.map((item: any) => (
                  <label
                    key={item.id}
                    className="
                group flex items-center gap-3 cursor-pointer
                rounded-xl border border-gray-200
                px-4 py-2.5
                transition-all duration-200
                hover:border-black hover:bg-gray-50
              "
                  >
                    {/* hidden checkbox (logic unchanged) */}
                    <input
                      type="checkbox"
                      checked={!!isChecked(item.id)}
                      onChange={() => handleCheck(item.id)}
                      className="peer absolute opacity-0 w-0 h-0"
                    />

                    {/* custom checkbox */}
                    <span
                      className={`w-4 h-4 flex items-center justify-center
                  rounded-full border-2
                  transition-all duration-200
                  ${
                    isChecked(item.id)
                      ? "bg-black border-black scale-105"
                      : "bg-white border-gray-300 group-hover:border-black"
                  }`}
                    >
                      {isChecked(item.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
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

                    {/* label */}
                    <span
                      className={`text-sm transition-colors
                  ${
                    isChecked(item.id)
                      ? "text-black font-medium"
                      : "text-gray-600 group-hover:text-black"
                  }`}
                    >
                      {item.name.toUpperCase()}
                    </span>
                  </label>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
