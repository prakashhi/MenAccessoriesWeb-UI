"use client";

import { UsePanel } from "@/context/Context";
import { getUserFromStorage } from "@/context/utils";
import { useEffect, useMemo, useState } from "react";

import { useRef } from "react";

import { CartItem } from "@/Type/CartType";
import { GuestCartItem } from "@/Type/GuestType";

import { LikeProductType } from "@/Type/LikeType";
import { notify } from "@/Component/ToastComponent";
import { Button } from "@heroui/react";
import { useGuestUser } from "@/context/GuestUserContext";
import { useUserCart } from "@/context/UserCartContext";

interface ProductState {
  Like: boolean;
  Cart: boolean;
  LikeData: LikeProductType;
  CartData: Record<string, CartItem>;
}

type CartListItem = GuestCartItem | CartItem;
type ProductStateSetter =
  | React.Dispatch<React.SetStateAction<ProductState>>
  | React.Dispatch<React.SetStateAction<CartListItem[]>>;

interface ItemCountProps {
  productId: string;
  quantity: number;
  stock: number;
  cartId: string;
  setState?: ProductStateSetter;
  VariantStock: number;
  stateChangeQuantity: (cardId: string, quantity: number) => void;
}

export default function ItemCount({
  productId,
  quantity,
  stock,
  cartId,
  setState,
  VariantStock,
  stateChangeQuantity,
}: ItemCountProps) {
  const user = useMemo(() => getUserFromStorage(), []);

  let IsStock: number = VariantStock == null ? stock : VariantStock;

  const {
    incrementGuestCartProduct,
    decrementGuestCartProduct,
    setCartProductQty,
  } = useGuestUser();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { incrementCartProduct, decrementCartProduct } = useUserCart();

  const [inputValue, setInputValue] = useState(String(quantity));

  // 🔥 Sync input with actual cart qty
  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const isMin = Number(inputValue) <= 1;
  const isMax = Number(inputValue) >= IsStock || IsStock === 0;

  const onBlur = () => {
    const num = Number(inputValue);
    setCartProductQty(productId, isNaN(num) ? 1 : num);
  };

  const stockCheck = (Qty: number) => {
    if (Qty > IsStock) {
      return false;
    }
    return true;
  };
  const requestVersionRef = useRef(0);

  const handleInCrement = async () => {
    if (user && setState) {
      let previousQty = Number(inputValue);
      const Qty = Math.max(1, Math.min(Number(inputValue) + 1, IsStock));
      setInputValue(String(Qty));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 3️⃣ Increase version
      const currentVersion = ++requestVersionRef.current;
      stateChangeQuantity(cartId, Qty);
      debounceRef.current = setTimeout(async () => {
        try {
          let res = await incrementCartProduct(cartId, Qty);

          if (res.success !== true) {
            stateChangeQuantity(cartId, previousQty);
          }

          // Ignore outdated responses
          if (currentVersion !== requestVersionRef.current) return;
        } catch (err: any) {
          let msg = err?.response?.data?.message || "Something is Wrong";

          notify({
            message: msg,
            type: "error",
          });
        }
      }, 400);
    } else {
      incrementGuestCartProduct(productId);
    }
  };

  const handleDeCrement = async () => {
    if (user && setState) {
      let previousQty = Number(inputValue);
      const Qty = Math.max(1, Math.min(Number(inputValue) - 1, IsStock));
      if (Qty >= 1) {
        setInputValue(String(Qty));
      }

      // 2️⃣ Clear previous API call
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 3️⃣ Increase version
      const currentVersion = ++requestVersionRef.current;
      stateChangeQuantity(cartId, Qty);
      debounceRef.current = setTimeout(async () => {
        try {
          let res = await decrementCartProduct(cartId, Qty);

          if (res.success !== true) {
            stateChangeQuantity(cartId, previousQty);
          }

          // Ignore outdated responses
          if (currentVersion !== requestVersionRef.current) return;
        } catch (err) {
          console.error("Failed to update cart", err);
        }
      }, 600);
    } else {
      decrementGuestCartProduct(productId);
    }
  };

  const handleEnterNumberChange = async (value: number) => {
    if (user && setState) {
      const Qty = value;
      setInputValue(String(Qty));

      // 2️⃣ Clear previous API call
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 3️⃣ Increase version
      const currentVersion = ++requestVersionRef.current;
      stateChangeQuantity(cartId, Qty);

      debounceRef.current = setTimeout(async () => {
        try {
          let res = await incrementCartProduct(cartId, Qty);

          // Ignore outdated responses
          if (currentVersion !== requestVersionRef.current) return;
        } catch (err) {
          console.error("Failed to update cart", err);
        }
      }, 600);
    } else {
      stateChangeQuantity(cartId, Number(value));
      // setState?.((prev: any) => {
      //   return prev.map((item: any) =>
      //     item.id === cartId ? { ...item, quantity: Number(value) } : item
      //   );
      // });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center border rounded-md border-gray-400  w-fit select-none">
        {/* MINUS */}
        <Button
          onPress={() => handleDeCrement()}
          disabled={isMin}
          className={`w-12 h-12 ${
            isMin
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-black cursor-pointer rounded-l-md hover:text-white"
          }`}
        >
          −
        </Button>

        {/* INPUT */}
        <input
          value={inputValue}
          onChange={(e) => {
            let value = e.target.value;

            if (/^\d*$/.test(value)) {
              if (value === "") {
                value = "1";
              }

              // Ensure value does not exceed stock
              const num = Number(value);
              if (num > IsStock) {
                value = String(IsStock);
              }

              setInputValue(value);
              handleEnterNumberChange(Number(value));
            }
          }}
          onBlur={onBlur}
          className="w-16 h-12 text-center border-x border-gray-300 outline-none"
        />

        {/* PLUS */}
        <Button
          onPress={() => handleInCrement()}
          disabled={isMax}
          className={`w-12 h-12 ${
            isMax
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-black cursor-pointer rounded-r-md hover:text-white"
          }`}
        >
          +
        </Button>
      </div>

      {IsStock === 0 ? (
        <span className="text-xs text-red-500">Out of stock</span>
      ) : (
        <span className="text-[11px] text-gray-500">
          Max {IsStock} per order
        </span>
      )}
    </div>
  );
}
