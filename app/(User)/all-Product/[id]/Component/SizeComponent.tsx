"use client";

import { SizeVariant } from "@/Type/ProductType";
type Props = {
  sizes: SizeVariant[] | null;
  selectedId?: string;
  onSelect: (size: SizeVariant) => void;
  sizeCart: string | undefined;
};

export default function SizeSelector({
  sizes,
  selectedId,
  onSelect,
  sizeCart,
}: Props) {

  return (
    <div className="flex flex-wrap gap-2">
      {sizes?.map((item) => {
        const isOutOfStock = item.stock <= 0;
        const isSelected = selectedId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => !isOutOfStock && onSelect(item)}
            disabled={isOutOfStock}
            className={`
              px-4 py-2 flex flex-col gap-1 cursor-pointer rounded-md border text-sm font-medium
              transition-all
              ${
                isOutOfStock
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : sizeCart == item.size || isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }
            `}
          >
            {item.size}
            <span className="text-[10px] text-gray-500">
              Stock: {item.stock}
            </span>
          </button>
        );
      })}
    </div>
  );
}
