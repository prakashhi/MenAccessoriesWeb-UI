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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-6 max-w-xl w-full"
    >
      <h2 className="text-2xl font-semibold">
        {mode === "add" ? "Add New Product" : "Edit Product"}
      </h2>

      {/* Name */}
      <div>
        <label className="font-medium">Product Name *</label>
        <input
          className="input w-full border rounded-lg p-3"
          placeholder="Men T-Shirt"
          {...register("name", { required: "Name is required" })}
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

      {/* Description */}
      <div>
        <label className="font-medium">Description *</label>
        <textarea
          className="input w-full border rounded-lg p-3 h-24 resize-none"
          placeholder="Write product details..."
          {...register("description", {
            required: "Description is required",
            minLength: { value: 20, message: "Minimum 20 characters required" },
          })}
        />
        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      </div>

      {/* Price */}
      <div>
        <label className="font-medium">Price (₹) *</label>
        <input
          type="number"
          className="input w-full border rounded-lg p-3"
          {...register("price", {
            required: "Price required",
            min: { value: 1, message: "Price must be at least ₹1" },
          })}
        />
        <p className="text-red-500 text-sm">{errors.price?.message}</p>
      </div>

      {/* Discount Price */}
      <div>
        <label className="font-medium">Discount Price (₹)</label>
        <input
          type="number"
          className="input w-full border rounded-lg p-3"
          {...register("discountPrice")}
        />
      </div>

      {/* Stock */}
      <div>
        <label className="font-medium">Stock *</label>
        <input
          type="number"
          className="input w-full border rounded-lg p-3"
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
          className="w-full border rounded-lg p-3"
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
          className="w-full border rounded-lg p-3"
          {...register("category", { required: "Category is required" })}
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
        <p className="text-red-500 text-sm">{errors.category?.message}</p>
      </div>

      {/* Brand */}
      <div>
        <label className="font-medium">Brand *</label>
        <input
          className="input w-full border rounded-lg p-3"
          placeholder="Nike, Adidas..."
          {...register("brand", { required: "Brand is required" })}
        />
        <p className="text-red-500 text-sm">{errors.brand?.message}</p>
      </div>

      {/* Colors */}
      <div>
        <label className="font-medium">Colors (comma separated) *</label>
        <input
          className="input w-full border rounded-lg p-3"
          placeholder="Red, Blue, Black"
          {...register("colors", {
            required: "Colors are required",
          })}
        />
        <p className="text-red-500 text-sm">{errors.colors?.message}</p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="font-medium">Product Image *</label>
        <input
          type="file"
          className="w-full border rounded-lg p-3 bg-gray-50"
          {...register("image", {
            required: mode === "add" ? "Image is required" : false,
          })}
        />
        <p className="text-red-500 text-sm">{errors.image?.message}</p>
      </div>

      {/* Status */}
      <div>
        <label className="font-medium">Status *</label>
        <select
          className="w-full border rounded-lg p-3"
          {...register("status", { required: "Status required" })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <p className="text-red-500 text-sm">{errors.status?.message}</p>
      </div>

      {/* Submit */}
      <button className="w-full py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-900 transition">
        {mode === "add" ? "Add Product" : "Save Changes"}
      </button>
    </form>
  );
}
