"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdCategory } from "react-icons/md";

export default function CategoryForm({ mode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState("");

  const onSubmit = (data) => {
    console.log("Category Submitted:", data);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Category Name *</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              placeholder="e.g. Men's Fashion"
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && <p className="text-xs mt-1 text-red-500">{errors.name.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              placeholder="mens-fashion"
              {...register("slug", { required: "Slug is required" })}
            />
            {errors.slug && <p className="text-xs mt-1 text-red-500">{errors.slug.message}</p>}
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Parent Category</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register("parent")}
            >
              <option value="">None</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register("status", { required: "Status is required" })}
            >
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
            </select>
            {errors.status && <p className="text-xs mt-1 text-red-500">{errors.status.message}</p>}
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none resize-none"
            placeholder="Write a short description for this category…"
            {...register("description")}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Category Image *</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-3 rounded-xl border bg-white border-gray-300"
            {...register("image", { required: "Image is required" })}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          {errors.image && <p className="text-xs mt-1 text-red-500">{errors.image.message}</p>}

          {preview && (
            <img
              src={preview}
              className="mt-3 w-36 h-36 rounded-xl object-cover border shadow-md"
            />
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
          {mode === "edit" ? "Save Changes" : "Add Category"}
        </button>
      </form>
    </div>
  );
}
