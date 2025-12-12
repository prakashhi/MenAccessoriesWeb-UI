"use client";

import { useState, useRef } from "react";
import { Checkbox } from "@heroui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { options } from "../option";

export default function OptionComponent() {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const toggle = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-3 font-[Inter]">
      {options.map((item, index) => (
        <AccordionSection
          key={index}
          index={index}
          item={item}
          open={open[index]}
          toggle={toggle}
        />
      ))}
    </div>
  );
}

function AccordionSection({ index, item, open, toggle }: any) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div
        onClick={() => toggle(index)}
        className="flex justify-between items-center px-5 py-4 cursor-pointer select-none"
      >
        <h2 className="text-[15px] font-semibold tracking-wide text-[#1a1a1a]">
          {item.name}
        </h2>

        <RiArrowDropDownLine
          size={26}
          className={`text-gray-600 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
      >
        <div className="px-5 pb-4 pt-1 space-y-3">
          {item.opt?.map((opt: string, i: number) => (
            <label
              key={i}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox size="sm" radius="full" />

              <span className="text-[14px] text-gray-700 group-hover:text-black transition font-medium">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
