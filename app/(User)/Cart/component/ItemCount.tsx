"use client";

import { UsePanel } from "@/context/SerchPanelContext";
import { Button } from "@heroui/react";
import { useCallback, useState } from "react";
import { product } from "../../../context/Types/type";

export default function ItemCount({
  id,
  type,
  Quanty,
  setItemscount,
}: {
  id: number;
  type?: string;
  Quanty: number;
  setItemscount?: (val: number) => void;
}) {
  const [count, setCount] = useState<number>(Quanty ? Quanty : 1);
  const { setCartProduct, setLikeProduct } = UsePanel();

  const chageValue = useCallback((count: number) => {
    const update = (prev: product[]) =>
      prev.map((val) => (val.id === id ? { ...val, Quanty: count } : val));

    if (type === "LikeProduct") setLikeProduct(update);
    else setCartProduct(update);
  }, []);

  const updateCount = (value: number) => {
    const valid = value < 1 ? 1 : value;
    setCount(valid);
    chageValue(valid);
    setItemscount && setItemscount(valid);
  };

  return (
    <div className="flex items-center rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm max-w-[120px] sm:max-w-[140px]">

      {/* DEC Button */}
      <Button
        size="sm"
        className="rounded-none w-10 sm:w-12 bg-black text-white hover:bg-neutral-800"
        onPress={() => updateCount(count - 1)}
      >
        -
      </Button>

      {/* Number Input */}
      <input
        type="number"
        value={count}
        onChange={(e) => updateCount(Number(e.target.value))}
        className="
          w-full text-center text-lg font-medium
          appearance-none outline-none bg-white
          [-moz-appearance:textfield]
        "
      />

      {/* Remove arrows on Chrome/Safari */}
      <style>
        {`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        `}
      </style>

      {/* INC Button */}
      <Button
        size="sm"
        className="rounded-none w-10 sm:w-12 bg-black text-white hover:bg-neutral-800"
        onPress={() => updateCount(count + 1)}
      >
        +
      </Button>
    </div>
  );
}
