"use client";

import { motion } from "framer-motion";

import {
  CartItem,
  VariantSize,
  LikeProductType,
  ProductInfoType,
} from "@/app/(User)/Type/Types";

interface ProductSizeSelectorProps {
  variants: VariantSize[];
  selectedId?: string;
  onSelect: (variant: VariantSize) => void;
}

export default function ProductSizeSelector({
  variants,
  selectedId,
  onSelect,
}: ProductSizeSelectorProps) {
  // show only sizes with stock > 0
  const availableVariants = variants.filter((v) => v.variantSizeStock > 0);

  if (availableVariants.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs tracking-[0.25em] text-gray-400 uppercase">
        Select Size
      </p>

      <div className="flex flex-wrap gap-3">
        {availableVariants.map((variant) => {
          const isActive = selectedId === variant.variantSizeId;

          return (
            <motion.button
              key={variant.variantSizeId}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(variant)}
              className={`
                min-w-[52px] px-4 py-2
                text-xs tracking-[0.2em] uppercase
                border transition-all duration-300
                ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }
              `}
            >
              {variant.variantSizeName}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
