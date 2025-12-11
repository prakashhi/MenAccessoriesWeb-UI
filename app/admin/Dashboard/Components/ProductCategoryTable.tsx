"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleeteModel";
import { MdEdit, MdDelete } from "react-icons/md";
import { useApi } from "@/app/useApi";

export default function ProductCategoryTable() {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const { callApi, data, loading, error } = useApi();

  const GetCategory = useCallback(async () => {
    try {
      let result = await callApi("get", "/category/get");
      setProducts(result);
    } catch (err) {
      console.log(err, error);
    }
  }, []);
  console.log(products);

  useEffect(() => {
    GetCategory();
  }, []);

  return (
    <div className="space-y-6">
      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block rounded-xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className=" px-4 py-3 text-center text-gray-700 font-medium uppercase tracking-wider">
                Category id
              </th>
              <th className="text-center px-4 py-3  text-gray-700 font-medium uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-4 py-3 text-center text-gray-700 font-medium uppercase tracking-wider">
                Description 
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products ? (
              products.map((p, index) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center text-gray-800 font-medium">
                    {p.id}
                  </td>
                  <td className="px-4 py-3  text-center text-gray-800">
                    {p.category_name}
                  </td>
                  <td className="px-4 py-3  text-center text-gray-800">{p.category_desc}</td>
               
                </tr>
              ))
            ) : (
              <>
                <div>no Data</div>
              </>
            )}
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
              <span className="font-medium text-gray-800">id:{p.id}</span>
              <span className="text-gray-500 text-sm">Category name: {p.category_name}</span>
            </div>
            <span className="text-gray-600">description : {p.category_desc}</span>
         
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
