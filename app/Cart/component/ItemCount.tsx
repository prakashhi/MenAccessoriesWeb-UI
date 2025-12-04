import { UsePanel } from "@/context/SerchPanelContext";
import { Button } from "@heroui/react";
import { useState } from "react";

import { product } from "../../../context/Types/type";

export default function ItemCount({ id }: { id: number }) {
  const [count, setCount] = useState<number>(1);
  const { setCartProduct } = UsePanel();

  const chageValue = (count: number) => {
    setCartProduct((prev: product[]) => {
      if (!prev) return [];
      return prev.map((val: product) =>
        val.id === id ? { ...val, Quanty: count } : val
      );
    });
  };

  const handleIncrement = () => {
    let updatedValue = count + 1;
    setCount(updatedValue);
    chageValue(updatedValue);
  };

  const handleDecrement = () => {
    if (count > 1) {
      let updatedValue = count - 1;
      setCount(updatedValue);
      chageValue(updatedValue);
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
        <span className="px-2">{count}</span>
      
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
