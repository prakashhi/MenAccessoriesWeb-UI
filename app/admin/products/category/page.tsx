"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { useApi } from "@/app/useApi";
import { toast } from "react-toastify";

import Image from "next/image";

import Loader from "@/public/svg/tube-spinner.svg";

export default function CategoryForm({ mode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { callApi, data, loading, error } = useApi();

  const onSubmit = async (info) => {

    try {
      const res = await callApi("post", "/category/Add", {
        data: { ...info },
      });

      // Show success toast
      toast.success(res.msg || "Category successfully Added!");
    } catch (err: any) {
      // Show error toast
      console.log(error);
      toast.error(err?.response?.data?.message || "Something is Wrong!");
    }
  };

  return (
    <div className="w-full flex justify-center px-4 md:px-10 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-3xl 
          bg-white/80 backdrop-blur-xl 
          shadow-xl rounded-2xl 
          border border-gray-100
          p-8 space-y-8
        "
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
            <MdCategory size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {mode === "edit" ? "Edit Category" : "Add New Category"}
            </h2>
            <p className="text-gray-500 text-sm">
              Manage category details for your products.
            </p>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className=" md:grid-cols-2 gap-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              placeholder="e.g. Men's Fashion"
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && (
              <p className="text-xs mt-1 text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none resize-none"
            placeholder="Write a short description for this category…"
            {...register("description", {
              required: "Category description is required",
            })}
          />
           {errors.description && (
              <p className="text-xs mt-1 text-red-500">{errors.description.message}</p>
            )}
        </div>

        {/* Submit Button */}
        <button
          className="
            w-full py-3 
            bg-black hover:bg-gray-900 
            text-white rounded-xl 
            text-lg font-medium 
            transition
          "
        >
          {loading == true ? (
            <Image alt="Loading" width={20} height={20} src={Loader} />
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
}
