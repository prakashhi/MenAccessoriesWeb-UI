"use client";

import Link from "next/link";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleeteModel";
import { MdEdit, MdDelete } from "react-icons/md";

const sampleProducts = [
  { id: 1, name: "Men T-Shirt", price: 299, stock: 50 },
  { id: 2, name: "Watch", price: 999, stock: 10 },
  { id: 3, name: "Sneakers", price: 1999, stock: 15 },
];

export default function ProductTable() {
  const [products, setProducts] = useState(sampleProducts);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block rounded-xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 font-medium uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-right text-gray-700 font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-800 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-800">₹{p.price}</td>
                <td className="px-4 py-3 text-gray-800">{p.stock}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <MdEdit /> Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <MdDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{p.name}</span>
              <span className="text-gray-500 text-sm">Stock: {p.stock}</span>
            </div>
            <span className="text-gray-600">Price: ₹{p.price}</span>
            <div className="flex gap-4 mt-2">
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <MdEdit /> Edit
              </Link>
              <button
                onClick={() => setDeleteId(p.id)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
