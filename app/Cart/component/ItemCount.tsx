"use client"
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
}) {
  const [count, setCount] = useState<number>(Quanty ? Quanty : 1);
  const { setCartProduct, cartProduct, setLikeProduct } = UsePanel();

  const chageValue = useCallback((count: number) => {
    if (type === "LikeProduct") {
      setLikeProduct((prev: product[]) => {
        if (!prev) return [];
        return prev.map((val: product) =>
          val.id === id ? { ...val, Quanty: count } : val
        );
      });
    } else {
      setCartProduct((prev: product[]) => {
        if (!prev) return [];
        return prev.map((val: product) =>
          val.id === id ? { ...val, Quanty: count } : val
        );
      });
    }
  }, []);

  const handleIncrement = () => {
    let updatedValue = count + 1;
    setCount(updatedValue);
    chageValue(updatedValue);
    if (setItemscount) {
      setItemscount(updatedValue);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      let updatedValue = count - 1;
      setCount(updatedValue);
      chageValue(updatedValue);
      if (setItemscount) {
        setItemscount(updatedValue);
      }
    }
  };

  return (
    <>
      <div className="flex flex-row border gap-1 border-gray-200">
        <Button
          className="border-r-1 border-gray-200"
          onPress={handleDecrement}
        >
          -
        </Button>
        {/* <span className="px-2">{count}</span> */}
        <input
          className="w-10 text-center appearance-none outline-none"
          onChange={(e: unknown) => {
            let num = Number(e.target.value);
            num < 1 ? setCount(1) : setCount(num);
            num < 1 ? chageValue(1) : chageValue(num);
          }}
          value={count}
          type="number"
        />

        <Button
          className="border-l-1 borer border-gray-200"
          onPress={handleIncrement}
        >
          +
        </Button>
      </div>
    </>
  );
}
