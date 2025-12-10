"use client";

import ProductForm from "../../Dashboard/Components/ProductForm";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <ProductForm mode="add" />
    </div>
  );
}
