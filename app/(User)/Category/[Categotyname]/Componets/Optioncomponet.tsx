"use client";

import { useState, useRef, useEffect } from "react";
import { Checkbox } from "@heroui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { options } from "../option";

export default function Optioncomponet() {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const toggle = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-4">
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
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (open) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [open]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div
        onClick={() => toggle(index)}
        className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
      >
        <h2 className="text-[16px] font-medium text-gray-800 tracking-wide">
          {item.name}
        </h2>

        <RiArrowDropDownLine
          size={28}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Smooth Auto Height */}
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="px-4 pb-3 pt-1 space-y-3">
          {item.opt?.map((opt: string, i: number) => (
            <label
              key={i}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox size="sm" radius="md" />
              <span className="text-[14px] text-gray-700 transition group-hover:text-black">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
