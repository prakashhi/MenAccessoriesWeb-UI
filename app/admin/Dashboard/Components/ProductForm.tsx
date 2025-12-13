"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { useApi } from "@/app/useApi";
import { notify } from "@/app/(User)/Component/ToastComponent";
import ImageKit from "imagekit-javascript";
import Loader from "@/public/svg/tube-spinner.svg";
import Image from "next/image";
import CategorySelector from "./CategorySelector";
import TagInput from "./TagInputComponent";

import { useRouter } from "next/navigation";

export default function ProductForm({ mode, productId }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  });

  const [state, setState] = useState({
    categoryList: [],
  });

  const { callApi, data, loading, error } = useApi();
  const router = useRouter()

  const GetCategory = useCallback(async () => {
    try {
      let result = await callApi("get", "/category/get");

      if (result?.error) {
        notify({
          message: result.message || "Something went wrong!",
          type: "error",
        });

        return;
      }
      setState((prev) => ({ ...prev, categoryList: result }));
    } catch (err) {
      console.log(err, error);
    }
  }, []);

  useEffect(() => {
    GetCategory();
  }, []);

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

  const onSubmit = async (info) => {
    const auth = await callApi("get", "/imagekit/auth");

    const files = info.images; // FileList (3 images)
    let imageUrls: string[] = [];

    // Step 2: Upload all images
    if (files && files.length > 0) {
      for (let file of files) {
        const uploaded = await imagekit.upload({
          file,
          fileName: `product-${Date.now()}`,
          ...auth,
          folder: "/products",
        });
        imageUrls.push(uploaded.url);
      }
    }
    const res = await callApi("post", "/product/create", {
      data: { ...info, images: imageUrls },
    });

    if (res?.error) {
      notify({ message: res.message || "SomeThing is Wrong!", type: "error" });
      return;
    }

    // Show success toast
    notify({ message: res.msg || "Product Added!", type: "success" });

    router.push("/admin/products");
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

          <CategorySelector
            categoryList={state.categoryList}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />

          <div>
            <TagInput
              label="Colors"
              value={watch("colors") || []}
              onChange={(tags) => setValue("colors", tags)}
            />
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
          <label className="font-medium">Product Images *</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            {...register("images", {
              required: mode === "add" ? "At least 1 image is required" : false,
              validate: {
                maxImages: (files) =>
                  files?.length <= 3 || "You can upload max 3 images only",
              },
            })}
          />

          <p className="text-red-500 text-sm">{errors.images?.message}</p>
        </div>

        {/* Submit */}
        <button
          className="
            w-full py-3 bg-black text-white rounded-xl 
            text-lg font-medium 
            hover:bg-gray-900 transition
          "
        >
          {loading == true ? (
            <Image alt="Loading" width={20} height={20} src={Loader} />
          ) : mode === "add" ? (
            "Add Product"
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}
