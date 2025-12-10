"use client";

import Link from "next/link";
import ProductTable from "../Dashboard/Components/ProductTable";

export default function ProductPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link
          href="/admin/products/add"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Add Product
        </Link>
      </div>

      <ProductTable />
    </div>
  );
}
