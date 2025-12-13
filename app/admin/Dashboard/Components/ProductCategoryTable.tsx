"use client";

import { useCallback, useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleeteModel";
import { useApi } from "@/app/useApi";
import CategoryDetailModal from "./DataShowModels/CategoryDataShowModel";

type Category = {
  id: number;
  category_name: string;
  category_desc: string;
};

export default function ProductCategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { callApi } = useApi();

  const handleDelete = () => {
    setCategories(categories.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  const GetCategory = useCallback(async () => {
    try {
      const result = await callApi("get", "/category/get");
      setCategories(result || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    GetCategory();
  }, []);


  return (
    <div className="space-y-6 font-sans">
      {
        <CategoryDetailModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          category={selectedProduct}
        />
      }

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["ID", "Category Name", "Description"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categories.length > 0 ? (
              categories.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => {
                    setSelectedProduct(c);
                    setOpenModal(true);
                  }}
                  className="group transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 text-center">
                    #{c.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">
                    {c.category_name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 text-center max-w-md mx-auto">
                    {c.category_desc || "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Card View ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              setSelectedProduct(c);
              setOpenModal(true);
            }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium tracking-wide">
                  CATEGORY ID
                </p>
                <p className="text-sm font-semibold text-gray-800">#{c.id}</p>
              </div>
            </div>

            <h3 className="mt-3 text-sm font-medium text-gray-900">
              {c.category_name}
            </h3>

            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              {c.category_desc || "No description provided"}
            </p>
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
