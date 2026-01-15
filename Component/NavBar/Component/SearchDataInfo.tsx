"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SearchComponents({ Data }: { Data: any }) {
  if (!Data) return null;

  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute top-full left-0 z-50  w-full max-h-[420px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
      >
        {/* 🔹 Categories Horizontal */}
        {/* {Data.categories?.length > 0 && (
          <div className="border-b border-gray-100 px-4 py-4">
            <p
              className="mb-3 text-[11px] font-medium uppercase text-gray-500"
              style={{ letterSpacing: "0.35em" }}
            >
              Categories
            </p>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {Data.categories.map((cat: any) => (
                <motion.div
                  key={cat.id}
                  onClick={() => router.push(`/category/${cat.id}`)}
                  whileHover={{ scale: 1.05 }}
                  className="flex shrink-0 items-center gap-5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  {cat.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${cat.image}`}
                      alt={cat.name}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                  )}
                  <span
                    className="text-xs font-medium text-gray-800"
                    style={{
                      fontFamily: "ui-serif, Georgia, serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cat.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )} */}

        {/* 🔹 Products (Scrollable) */}
        {Data.data?.length > 0 && (
          <div className="px-4 py-4 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            <p
              className="mb-3 text-[11px] font-medium uppercase text-gray-500"
              style={{ letterSpacing: "0.35em" }}
            >
              Products
            </p>

            <div className="flex flex-col gap-2">
              {Data.data.map((product: any) => (
                <motion.div
                  onClick={() => router.push(`/all-Product/${product.id}`)}
                  key={product.id}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 rounded-xl px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {product.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${
                        product.image.split("/")[1]
                      }`}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                  )}

                  <div className="flex flex-col">
                    <span
                      className="text-sm font-medium text-gray-900"
                      style={{
                        fontFamily: "ui-serif, Georgia, serif",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {product.name}
                    </span>

                    <span
                      className="text-xs text-gray-500"
                      style={{
                        fontFamily: "ui-serif, Georgia, serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {product.categoryName}
                    </span>

                    {product.sellingPrice && (
                      <span
                        className="text-xs text-gray-500"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        ₹ {product.sellingPrice}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 🔹 No Results */}
        {Data.categories?.length === 0 && Data.products?.length === 0 && (
          <div className="flex h-[200px] items-center justify-center">
            <p
              className="text-sm text-gray-400"
              style={{ letterSpacing: "0.12em" }}
            >
              No results found
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
