"use client";

import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { options } from "../option";
import { useApi } from "@/app/useApi";
import { useParams } from "next/navigation";

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

    console.log([subCategoryRes, materialRes]);

    setState((prev) => ({
      ...prev,
      subCategories: subCategoryRes?.data,
      materials: materialRes?.data,
    }));
  };

  useEffect(() => {
    getfilterData();
  }, []);

  console.log("Satellite", state);

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
  const contentRef = useRef<HTMLDivElement>(null);
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
        <span className="text-sm font-medium tracking-widest uppercase">
          {title}
        </span>
        <RiArrowDropDownLine
          size={24}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* CONTENT */}
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="px-6 pb-5 space-y-3">
          {Array.isArray(items) &&
            items.map((item: any) => (
              <label
                key={item.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!checkedItems[item.id]}
                  onChange={() => handleCheck(item.id)}
                  className="accent-black"
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}
