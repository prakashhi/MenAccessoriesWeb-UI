"use client";

import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useApi } from "@/app/useApi";
import { motion, AnimatePresence } from "framer-motion";

export default function OptionComponent() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [state, setState] = useState({
    subCategories: [],
    materials: [],
  });

  const { callApi } = useApi();

  const getfilterData = async () => {
    const [subCategoryRes, materialRes] = await Promise.all([
      callApi(
        "get",
        `http://localhost:3005/product/subcategories?id=cfe77101-77f5-4811-9cdc-186ba9af9279&page=1&limit=100`
      ),
      callApi("get", `http://localhost:3005/material-list?page=1&limit=10`),
    ]);

    setState((prev) => ({
      ...prev,
      subCategories: subCategoryRes?.data,
      materials: materialRes?.data,
    }));
  };

  useEffect(() => {
    getfilterData();
  }, []);

  const toggle = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sections = [
    { title: "Sub Categories", items: state.subCategories },
    { title: "Materials", items: state.materials },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <AccordionSection
          key={index}
          index={index}
          title={section.title}
          items={section.items}
          open={!!open[index]}
          toggle={toggle}
        />
      ))}
    </div>
  );
}

function AccordionSection({ index, title, items, open, toggle }: any) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-2xl bg-white border border-[#EDEDED] shadow-sm">
      {/* HEADER */}
      <button
        onClick={() => toggle(index)}
        className="w-full flex justify-between items-center px-6 py-4"
      >
        <span className="text-sm font-medium tracking-widest uppercase">{title}</span>
        <RiArrowDropDownLine
          size={24}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
                    checked={!!checkedItems[item.id]}
                    onChange={() => handleCheck(item.id)}
                    className="peer absolute opacity-0 w-6 h-6"
                  />
                  <span
                    className={`w-6 h-6 flex-shrink-0 rounded-lg border-2 border-gray-300 flex items-center justify-center transition-all duration-300
                      ${checkedItems[item.id] ? "bg-black border-black" : "bg-white"}`
                    }
                  >
                    {checkedItems[item.id] && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
  );
}
