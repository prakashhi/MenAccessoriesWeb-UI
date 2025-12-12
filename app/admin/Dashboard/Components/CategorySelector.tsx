"use client";

import { useState, useEffect } from "react";

export default function CategorySelector({
  categoryList,
  register,
  setValue,
  watch,
  errors,
}) {
  const selectedCategory = watch("category_id"); // watch category value
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setValue("sub_category", ""); // reset subcategory
      return;
    }

    // Find selected category object
    const cat = categoryList.find(
      (c) => c.id === selectedCategory
    );

    if (cat && cat.sub_category) {
      setSubcategories(JSON.parse(cat.sub_category));
    } else {
      setSubcategories([]);
    }

    // Reset subcategory value whenever category changes
    setValue("sub_category", "");
  }, [selectedCategory, categoryList, setValue]);

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none"
          {...register("category_id", { required: "Category is required" })}
        >
          <option value="">Select Category</option>

          {categoryList?.map((cat, index) => (
            <option key={index} value={cat.id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-xs mt-1 text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Sub Category Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Sub Category *</label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none"
          {...register("sub_category")}
        >
          <option value="">Select Sub Category</option>

          {subcategories.length > 0 ? (
            subcategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))
          ) : (
            <option disabled>No Sub-category</option>
          )}
        </select>

        {errors.sub_category && (
          <p className="text-xs mt-1 text-red-500">{errors.sub_category.message}</p>
        )}
      </div>

    </div>
  );
}
