"use client";

import { ImageShowUtil } from "@/app/utils/ImageShowUtil";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { VariantSize, variantDataProduct } from "@/app/(User)/Type/Types";

type Variant = {
  id: string;
  code?: string;
  image?: string | null;
  stock?: number;
  name: string;
  canBeMade?: number;
  isActive?: boolean;
};

type Props = {
  variants: variantDataProduct[];
  selectedId?: string | null;
  onSelect: (variant: Variant) => void;
  ProductId: string;
};

export default function VariantSelector({
  variants,
  ProductId,
  selectedId,
  onSelect,
}: Props) {
  if (!variants || variants.length === 0) return null;

  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center py-5 gap-4">
      {Array.isArray(variants) &&
        variants.map((variant) => {
          const outOfStock = variant.stock === 0;
          const disabled = !variant.isActive || outOfStock;
          const isSelected = selectedId === variant.id;

          return (
            <button
              key={variant.id}
              disabled={disabled}
              onClick={() => {
                onSelect(variant);
                router.push(`/all-Product/${variant.id}`);
              }}
              className={`
          group flex flex-col items-center gap-2
          w-32 p-2 rounded-sm border
          transition-all duration-200
          ${
            ProductId == variant.id
              ? " shadow "
              : "border-gray-200 hover:border-gray-400"
          }
          ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        `}
            >
              {/* IMAGE */}
              <div className="relative w-28 h-28 rounded-sm bg-gray-50 overflow-hidden">
                <Image
                  fill
                  src={ImageShowUtil(variant.image)}
                  alt={variant.code || "Variant"}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="112px"
                />
              </div>

              {/* CODE */}
              {variant.code && (
                <span className="text-xs font-medium text-gray-700 text-center">
                  {variant.name}
                </span>
              )}

              {/* STATUS */}
              {outOfStock ? (
                <span className="text-[10px] text-red-500">Out of stock</span>
              ) : (
                <span className="text-[10px] text-gray-500">
                  Stock : {variant.stock}
                </span>
              )}
            </button>
          );
        })}
    </div>
  );
}
