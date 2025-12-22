"use client";

import { UsePanel } from "@/context/Context";
import { getGuestCart, getUserFromStorage } from "@/context/utils";
import { useEffect, useMemo, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import {
  CartItem,
  VariantSize,
  LikeProductType,
  ProductInfoType,
} from "@/app/(User)/Type/Types";

interface ProductState {
  Like: boolean;
  Cart: boolean;
  LikeData: LikeProductType;
  CartData: CartItem;
}

interface ItemCountProps {
  productId: string;
  quantity: number;
  stock: number;
  cartId: string;
  setState?: Dispatch<SetStateAction<ProductState>> | null;
}

export default function ItemCount({
  productId,
  quantity,
  stock,
  cartId,
  setState,
}: ItemCountProps) {
  const user = useMemo(() => getUserFromStorage(), []);
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

  const handleInCrement = async () => {
    if (user) {
      const Qty = Number(inputValue) + 1;
      setInputValue(String(Qty));

      setState?.((prev) => ({
        ...prev,
        CartData: {
          ...prev.CartData,
          quantity: Number(Qty),
        },
      }));

      await incrementCartProduct(productId, cartId, Number(inputValue));
    } else {
      incrementCartProduct(productId, cartId, quantity);
    }
  };

  const handleDeCrement = async () => {
    if (user) {
      const Qty = Number(inputValue) - 1;
      setInputValue(String(Qty));

      setState?.((prev) => ({
        ...prev,
        CartData: {
          ...prev.CartData,
          quantity: Number(Qty),
        },
      }));

      await decrementCartProduct(productId, cartId, Number(inputValue));
    } else {
      decrementCartProduct(productId, cartId, Number(quantity));
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center border border-black w-fit select-none">
        {/* MINUS */}
        <button
          onClick={() => handleDeCrement()}
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
          onClick={() => handleInCrement()}
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
