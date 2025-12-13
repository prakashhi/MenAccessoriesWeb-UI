"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleeteModel";
import { MdEdit, MdDelete } from "react-icons/md";
import { useApi } from "@/app/useApi";
import { notify } from "@/app/(User)/Component/ToastComponent";
import ProductDetailModal from "./DataShowModels/ProductDataShowModel";

type Product = {
  id: number;
  product_name: string;
  price: number;
  stock: number;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { callApi } = useApi();

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const ProductData = useCallback(async () => {
    const res = await callApi("get", "/product/get");

    if (res.error) {
      notify({
        message: res.message || "Something went wrong",
        type: "error",
      });
      return;
    }

    setProducts(res);
  }, []);

  useEffect(() => {
    ProductData();
  }, []);

 

  return (
    <div className="space-y-6 font-sans">
      {
        <ProductDetailModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          product={selectedProduct}
        />
      }
      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["ID", "Product", "Price", "Stock"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setOpenModal(true);
                }}
                className="group transition hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  #{p.id}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {p.product_name}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ₹{p.price}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                    ${
                      p.stock > 0
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Card View ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              setSelectedProduct(p);
              setOpenModal(true);
            }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium tracking-wide">
                  PRODUCT ID
                </p>
                <p className="text-sm font-semibold text-gray-800">#{p.id}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium
                ${
                  p.stock > 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {p.stock > 0 ? "In Stock" : "Out"}
              </span>
            </div>

            <h3 className="mt-3 text-sm font-medium text-gray-900 leading-snug">
              {p.product_name}
            </h3>

            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">
                ₹{p.price}
              </span>
              <span className="text-xs text-gray-500">Qty: {p.stock}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Delete Modal ================= */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
