"use client";

import { UsePanel } from "@/context/Context";
import { getGuestCart, getUserFromStorage } from "@/context/utils";
import { useEffect, useState } from "react";

interface ItemCountProps {
  productId: string;
  quantity: number;
  stock: number;
}

export default function ItemCount({
  productId,
  quantity,
  stock,
}: ItemCountProps) {
  const { incrementCartProduct, decrementCartProduct, setCartProductQty } =
    UsePanel();

  const [inputValue, setInputValue] = useState(String(quantity));

  // 🔥 Sync input with actual cart qty
  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const isMin = quantity <= 1;
  const isMax = quantity >= stock || stock === 0;

  const onBlur = () => {
    const num = Number(inputValue);
    setCartProductQty(productId, isNaN(num) ? 1 : num);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center border border-black w-fit select-none">
        {/* MINUS */}
        <button
          onClick={() => decrementCartProduct(productId)}
          disabled={isMin}
          className={`w-12 h-12 ${
            isMin
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
        >
          −
        </button>

        {/* INPUT */}
        <input
          value={inputValue}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) setInputValue(e.target.value);
          }}
          onBlur={onBlur}
          className="w-16 h-12 text-center border-x border-black outline-none"
        />

        {/* PLUS */}
        <button
          onClick={() => incrementCartProduct(productId)}
          disabled={isMax}
          className={`w-12 h-12 ${
            isMax
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
        >
          +
        </button>
      </div>

      {stock === 0 ? (
        <span className="text-xs text-red-500">Out of stock</span>
      ) : (
        <span className="text-[11px] text-gray-500">Max {stock} per order</span>
      )}
    </div>
  );
}
