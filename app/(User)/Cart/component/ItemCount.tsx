"use client";

import { UsePanel } from "@/context/Context";
import { getGuestCart, getUserFromStorage } from "@/context/utils";
import { useEffect, useMemo, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import { useRef, useCallback } from "react";

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
  setState?: React.Dispatch<React.SetStateAction<ProductState[]>>;
}

export default function ItemCount({
  productId,
  quantity,
  stock,
  cartId,
  setState,
}: ItemCountProps) {
  const user = useMemo(() => getUserFromStorage(), []);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { incrementCartProduct, decrementCartProduct, setCartProductQty } =
    UsePanel();

  const [inputValue, setInputValue] = useState(String(quantity));

   console.log(quantity)

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

  const stockCheck = (Qty: number) => {
    if (Qty > stock) {
      return false;
    }
    return true;
  };

  const handleInCrement = async () => {
    if (user) {
      const Qty = Number(inputValue) + 1;
      setInputValue(String(Qty));

      // setState?.((prev) => ({
      //   ...prev,
      //   CartData: {
      //     ...prev.CartData,
      //     quantity: Number(Qty),
      //   },
      // }));
      setState?.((prev) =>
        prev.map((item: any) =>
          item.id === cartId ? { ...item, quantity: Number(Qty) } : item
        )
      );

      await incrementCartProduct(productId, cartId, Number(inputValue));
    } else {
      incrementCartProduct(productId, cartId, quantity);
    }
  };

  const handleDeCrement = async () => {
    if (user) {
      const Qty = Number(inputValue) - 1;
      setInputValue(String(Qty));

      // setState?.((prev) => ({
      //   ...prev,
      //   CartData: {
      //     ...prev.CartData,
      //     quantity: Number(Qty),
      //   },
      // }));

      setState?.((prev) =>
        prev.map((item: any) =>
          item.id === cartId ? { ...item, quantity: Number(Qty) } : item
        )
      );

      await decrementCartProduct(productId, cartId, Number(inputValue));
    } else {
      decrementCartProduct(productId, cartId, Number(quantity));
    }
  };

  const handleEnterNumberChange = async (value: number) => {
    if (user) {
      // setState?.((prev) => ({
      //   ...prev,
      //   CartData: {
      //     ...prev.CartData,
      //     quantity: Number(value),
      //   },
      // }));

      // setState?.((prev) =>
      //   prev.map((item: any) =>
      //     item.id === cartId ? { ...item, quantity: Number(value) } : item
      //   )
      // );

      setState?.((prev) => {
        if (!prev || !Array.isArray(prev)) return []; // fallback to empty array
        return prev.map((item: any) =>
          item.id === cartId ? { ...item, quantity: Number(value) } : item
        );
      });

      // 2️⃣ Clear previous API call
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        try {
          await incrementCartProduct(productId, cartId, value);
        } catch (err) {
          console.error("Failed to update cart", err);
        }
      }, 600);

      // await incrementCartProduct(productId, cartId, Number(value));
    } else {
      incrementCartProduct(productId, cartId, value);
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
            // if (/^\d*$/.test(e.target.value)) {
            //   let value = e.target.value;

            //   // ❌ block update if stock exceeded
            //   if (!stockCheck(Number(value))) return;
            //   setInputValue(value);

            //   handleEnterNumberChange(Number(value));
            // }

            let value = e.target.value;

            // Only allow digits
            if (/^\d*$/.test(value)) {
              // If user deletes all, reset to "1"
              if (value === "") {
                value = "1";
              }

              // Ensure value does not exceed stock
              const num = Number(value);
              if (num > stock) {
                value = String(stock);
              }

              setInputValue(value);
              handleEnterNumberChange(Number(value));
            }
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
