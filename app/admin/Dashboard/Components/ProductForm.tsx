"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ProductForm({ mode, productId }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Prefill data in edit mode
  useEffect(() => {
    if (mode === "edit") {
      setValue("name", "Sample Product");
      setValue("description", "Lightweight cotton t-shirt for men.");
      setValue("price", 299);
      setValue("discountPrice", 249);
      setValue("stock", 20);
      setValue("type", "clothing");
      setValue("colors", "Black, White");
      setValue("brand", "Nike");
      setValue("category", "men");
      setValue("status", "active");
    }
  }, []);

  const onSubmit = (data) => {
    console.log(mode === "add" ? "Add Product =>" : "Update Product =>", data);
  };

  return (
    <div className="w-full flex justify-center lg:px-4 px-0 md:px-10 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-4xl 
          bg-white/80 backdrop-blur-xl 
          shadow-xl rounded-2xl 
          border border-gray-100
          p-8 space-y-8
        "
      >
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold">
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill all the product details below.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="font-medium">Product Name *</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              placeholder="Men T-Shirt"
              {...register("name", { required: "Name is required" })}
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Brand */}
          <div>
            <label className="font-medium">Brand *</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              placeholder="Nike, Adidas..."
              {...register("brand", { required: "Brand is required" })}
            />
            <p className="text-red-500 text-sm">{errors.brand?.message}</p>
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price (₹) *</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register("price", {
                required: "Price required",
                min: { value: 1, message: "Minimum price is ₹1" },
              })}
            />
            <p className="text-red-500 text-sm">{errors.price?.message}</p>
          </div>

          {/* Discount Price */}
          <div>
            <label className="font-medium">Discount Price (₹)</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              {...register("discountPrice")}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="font-medium">Stock *</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register("stock", {
                required: "Stock required",
                min: { value: 0, message: "Stock cannot be negative" },
              })}
            />
            <p className="text-red-500 text-sm">{errors.stock?.message}</p>
          </div>

          {/* Product Type */}
          <div>
            <label className="font-medium">Product Type *</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              {...register("type", { required: "Product type required" })}
            >
              <option value="">Select Type</option>
              <option value="clothing">Clothing</option>
              <option value="shoes">Shoes</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
            </select>
            <p className="text-red-500 text-sm">{errors.type?.message}</p>
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category *</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              {...register("category", { required: "Category required" })}
            >
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
            <p className="text-red-500 text-sm">{errors.category?.message}</p>
          </div>

          {/* Colors */}
          <div>
            <label className="font-medium">Colors (comma separated) *</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              placeholder="Red, Blue, Black"
              {...register("colors", {
                required: "Colors are required",
              })}
            />
            <p className="text-red-500 text-sm">{errors.colors?.message}</p>
          </div>

          {/* Status */}
          <div>
            <label className="font-medium">Status *</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black outline-none"
              {...register("status", { required: "Status required" })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <p className="text-red-500 text-sm">{errors.status?.message}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description *</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-black outline-none resize-none h-28"
            placeholder="Write product details..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Minimum 20 characters required",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-medium">Product Image *</label>
          <input
            type="file"
            className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            {...register("image", {
              required: mode === "add" ? "Image is required" : false,
            })}
          />
          <p className="text-red-500 text-sm">{errors.image?.message}</p>
        </div>

        {/* Submit */}
        <button
          className="
            w-full py-3 bg-black text-white rounded-xl 
            text-lg font-medium 
            hover:bg-gray-900 transition
          "
        >
          {mode === "add" ? "Add Product" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
