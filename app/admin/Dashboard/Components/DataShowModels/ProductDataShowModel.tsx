"use client";

import Image from "next/image";

interface Product {
  id: string;
  product_name: string;
  description: string;
  price: number;
  discount_price: number | null;
  category_id: string;
  sub_category: string;
  images: string | string[];
  product_colors: string[] | string;
  stock: number;
  created_at: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductDetailModal({
  open,
  onClose,
  product,
}: Props) {
  if (!open || !product) return null;

  /* Normalize data */
  const images: string[] = Array.isArray(product.images)
    ? product.images
    : JSON.parse(product.images || "[]");

  const colors: string[] = Array.isArray(product.product_colors)
    ? product.product_colors
    : product.product_colors
    ? [product.product_colors]
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-3">
      <div className="w-full max-w-5xl bg-[#F9FAFB] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
              Product Overview
            </p>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {product.product_name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5 md:p-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative w-full h-72 md:h-[22rem] rounded-2xl overflow-hidden bg-white border">
              <Image
                src={images[0]}
                alt={product.product_name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative min-w-[64px] h-16 rounded-xl overflow-hidden border bg-white hover:scale-105 transition"
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between space-y-6">
            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-semibold text-gray-900">
                ₹{product.price}
              </span>
              {product.discount_price && (
                <span className="text-sm text-gray-400 line-through mb-1">
                  ₹{product.discount_price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Product ID" value={product.id} />
              <Info label="Stock" value={`${product.stock}`} />
              <Info label="Sub Category" value={product.sub_category} />
              <Info
                label="Created"
                value={new Date(product.created_at).toLocaleDateString()}
              />
            </div>

            {/* Colors */}
            {colors.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                  Available Colors
                </p>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-700 border"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer hint */}
            <p className="text-xs text-gray-400 italic">
              Inventory managed securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small info block */
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);
