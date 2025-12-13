"use client";

import { useState } from "react";

interface ItemCountProps {
  Quanty: number;
  setItemscount: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}

export default function ItemCount({
  Quanty,
  setItemscount,
  stock,
}: ItemCountProps) {
  const [inputValue, setInputValue] = useState(String(Quanty));

  const isMin = Quanty <= 1;
  const isMax = Quanty >= stock || stock === 0;

  const clamp = (value: number) => {
    if (value < 1) return 1;
    if (value > stock) return stock;
    return value;
  };

  const decrease = () => {
    if (!isMin) {
      const val = Quanty - 1;
      setItemscount(val);
      setInputValue(String(val));
    }
  };

  const increase = () => {
    if (!isMax) {
      const val = Quanty + 1;
      setItemscount(val);
      setInputValue(String(val));
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow empty while typing
    if (e.target.value === "") {
      setInputValue("");
      return;
    }

    // only numbers
    if (!/^\d+$/.test(e.target.value)) return;

    setInputValue(e.target.value);
  };

  const onBlur = () => {
    const num = Number(inputValue);
    const safeValue = clamp(isNaN(num) ? 1 : num);

    setItemscount(safeValue);
    setInputValue(String(safeValue));
  };

  return (
    <div className="flex flex-col gap-1">
      {/* QTY CONTROL */}
      <div className="flex items-center border border-black w-fit select-none">
        {/* MINUS */}
        <button
          onClick={decrease}
          disabled={isMin}
          className={`
            w-12 h-12 flex items-center justify-center
            text-lg font-light transition
            ${
              isMin
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-black hover:text-white"
            }
          `}
        >
          −
        </button>

        {/* INPUT */}
        <input
          value={inputValue}
          onChange={onInputChange}
          onBlur={onBlur}
          inputMode="numeric"
          className="
            w-16 h-12 text-center text-sm font-semibold tracking-widest
            border-x border-black outline-none
            bg-transparent
          "
        />

        {/* PLUS */}
        <button
          onClick={increase}
          disabled={isMax}
          className={`
            w-12 h-12 flex items-center justify-center
            text-lg font-light transition
            ${
              isMax
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-black hover:text-white"
            }
          `}
        >
          +
        </button>
      </div>

      {/* STOCK INFO */}
      {stock === 0 ? (
        <span className="text-xs text-red-500 font-medium">
          Out of stock
        </span>
      ) : (
        <span className="text-[11px] text-gray-500">
          Max {stock} per order
        </span>
      )}
    </div>
  );
}
