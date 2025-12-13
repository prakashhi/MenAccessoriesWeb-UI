"use client";

import { useState, useRef } from "react";
import { Checkbox } from "@heroui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { options } from "../option";

export default function OptionComponent() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

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
          open={!!open[index]}
          toggle={toggle}
        />
      ))}
    </div>
  );
}


function AccordionSection({ index, item, open, toggle }: any) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="
        rounded-2xl bg-white
        border border-[#EDEDED]
        transition-all duration-300
        hover:border-[#D6D6D6]
      "
    >
      {/* HEADER */}
      <button
        onClick={() => toggle(index)}
        className="
          w-full flex justify-between items-center
          px-5 sm:px-6 py-4
          text-left
          focus:outline-none
        "
      >
        <span
          className="
            text-[13px] sm:text-[14px]
            font-medium tracking-[0.15em]
            text-[#111]
            uppercase
          "
        >
          {item.name}
        </span>

        <RiArrowDropDownLine
          size={24}
          className={`
            text-[#666]
            transition-transform duration-300 ease-out
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* CONTENT */}
      <div
        ref={contentRef}
        style={{
          maxHeight: open
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
        className="
          overflow-hidden
          transition-[max-height,opacity]
          duration-300 ease-out
        "
      >
        <div className="px-5 sm:px-6 pb-5 space-y-3">
          {item.opt?.map((opt: string, i: number) => (
            <label
              key={i}
              className="
                flex items-center gap-3
                cursor-pointer
                group
              "
            >
              <Checkbox
                size="sm"
                radius="full"
                classNames={{
                  base: "data-[selected=true]:border-black",
                }}
              />

              <span
                className="
                  text-[13px]
                  text-[#666]
                  tracking-wide
                  transition-colors duration-200
                  group-hover:text-black
                "
              >
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
