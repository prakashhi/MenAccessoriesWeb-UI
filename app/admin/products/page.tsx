"use client";

import Link from "next/link";
import ProductTable from "../Dashboard/Components/ProductTable";
import ProductCategoryTable from "../Dashboard/Components/ProductCategoryTable";

export default function ProductPage() {
  return (
    <div className="space-y-10 font-sans">
      {/* ================= Header ================= */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
            Product Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage products and categories in your store
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/admin/products/add"
            className="inline-flex justify-center items-center rounded-xl border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black hover:shadow-md"
          >
            Add Product
          </Link>

          <Link
            href="/admin/products/category"
            className="inline-flex justify-center items-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition hover:border-gray-900 hover:shadow-md"
          >
            Add Category
          </Link>
        </div>
      </div>

      {/* ================= Product Section ================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Product List
        </h2>

        <div className="rounded-2xl">
          <ProductTable />
        </div>
      </section>

      {/* ================= Category Section ================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Category List
        </h2>

        <div className="rounded-2xl">
          <ProductCategoryTable />
        </div>
      </section>

      
    </div>
  );
}
