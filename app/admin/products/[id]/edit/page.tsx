"use client";

import ProductForm from "../../../Dashboard/Components/ProductForm";

export default function page({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm mode="edit" productId={params.id} />
    </div>
  );
}
