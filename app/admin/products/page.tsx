"use client";

import Link from "next/link";
import ProductTable from "../Dashboard/Components/ProductTable";

export default function ProductPage() {
  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-between   items-center mb-6">
        <h1 className="lg:text-2xl text-medium font-bold">Product List</h1>

        <div className="flex gap-4 mt-8">
          <Link
            href="/admin/products/add"
            className="px-4 py-2 text-medium bg-black text-white rounded-lg"
          >
            Add Product
          </Link>

          <Link
            className="px-4 py-2 bg-black text-white rounded-lg"
            href={"/admin/products/category"}
          >
            Add Category
          </Link>
        </div>
      </div>

      <ProductTable />
    </div>
  );
}
