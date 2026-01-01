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
  GuestCartItem,
} from "@/app/(User)/Type/Types";

interface ProductState {
  Like: boolean;
  Cart: boolean;
  LikeData: LikeProductType;
  CartData: Record<string, CartItem>;
}

type CartListItem = GuestCartItem | CartItem;
type ProductStateSetter =
  | React.Dispatch<React.SetStateAction<ProductState>>
  // | React.Dispatch<React.SetStateAction<ProductState[]>>
  | React.Dispatch<React.SetStateAction<CartListItem[]>>;

interface ItemCountProps {
  productId: string;
  quantity: number;
  stock: number;
  cartId: string;
  setState?: ProductStateSetter;
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

  // 🔥 Sync input with actual cart qty
  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const isMin = Number(inputValue) <= 1;
  const isMax = Number(inputValue) >= stock || stock === 0;

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
  const requestVersionRef = useRef(0);

  const handleInCrement = async () => {
    if (user && setState) {
      const Qty = Math.max(1, Math.min(Number(inputValue) + 1, stock));

      setInputValue(String(Qty));

      setState?.((prev: any) => {
        const item = prev.CartData?.[cartId];
        if (!item) return prev;

        return {
          ...prev,
          CartData: {
            ...prev.CartData,
            [cartId]: {
              ...item,
              quantity: Qty,
            },
          },
        };
      });

      // 2️⃣ Clear previous API call
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 3️⃣ Increase version
      const currentVersion = ++requestVersionRef.current;

      debounceRef.current = setTimeout(async () => {
        try {
          await incrementCartProduct(productId, cartId, Qty);
          // Ignore outdated responses
          if (currentVersion !== requestVersionRef.current) return;
        } catch (err) {
          console.error("Failed to update cart", err);
        }
      }, 600);
    } else {
      incrementCartProduct(productId, cartId, quantity);
    }
  };

  const handleDeCrement = async () => {
    if (user && setState) {
      const Qty = Math.max(1, Math.min(Number(inputValue) - 1, stock));
      if (Qty >= 1) {
        setInputValue(String(Qty));
      }

      setState?.((prev: any) => {
        const item = prev.CartData?.[cartId];
        if (!item) return prev;

        return {
          ...prev,
          CartData: {
            ...prev.CartData,
            [cartId]: {
              ...item,
              quantity: Qty,
            },
          },
        };
      });

      // 2️⃣ Clear previous API call
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 3️⃣ Increase version
      const currentVersion = ++requestVersionRef.current;

      debounceRef.current = setTimeout(async () => {
        try {
          await decrementCartProduct(productId, cartId, Qty);

          // Ignore outdated responses
          if (currentVersion !== requestVersionRef.current) return;
        } catch (err) {
          console.error("Failed to update cart", err);
        }
      }, 600);
    } else {
      decrementCartProduct(productId, cartId, Number(quantity));
    }
  };

  const handleEnterNumberChange = async (value: number) => {
    if (user && setState) {
      const Qty = value;
      setInputValue(String(Qty));

      setState?.((prev: any) => {
        const item = prev.CartData?.[cartId];
        if (!item) return prev;

        return {
          ...prev,
          CartData: {
            ...prev.CartData,
            [cartId]: {
              ...item,
              quantity: Qty,
            },
          },
        };
      });

      // 2️⃣ Clear previous API call
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 3️⃣ Increase version
      const currentVersion = ++requestVersionRef.current;

      debounceRef.current = setTimeout(async () => {
        try {
          await incrementCartProduct(productId, cartId, Qty);

          // Ignore outdated responses
          if (currentVersion !== requestVersionRef.current) return;
        } catch (err) {
          console.error("Failed to update cart", err);
        }
      }, 600);
    } else {
      setState?.((prev: any) => {
        // if (!prev || !Array.isArray(prev)) return []; // fallback to empty array
        return prev.map((item: any) =>
          item.id === cartId ? { ...item, quantity: Number(value) } : item
        );
      });
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
              : "hover:bg-black cursor-pointer hover:text-white"
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
              : "hover:bg-black cursor-pointer hover:text-white"
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
