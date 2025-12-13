"use client";

import Nav from "../../../Component/NavBar/Nav";
import Footer from "../../../Component/Footer/Footer";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import { UsePanel } from "@/context/SerchPanelContext";
import ItemCount from "@/app/(User)/Cart/component/ItemCount";
import Star from "@/app/(User)/Component/ProductList/Star";
import PictureGallery from "./Component/PictureGallery";
import { notify } from "@/app/(User)/Component/ToastComponent";
import { useApi } from "@/app/useApi";

export default function ProductPage() {
  const params = useParams();
  const { callApi } = useApi();
  const { AddCartProduct, AddLikeProduct } = UsePanel();

  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);

  const getProductData = useCallback(async () => {
    const res = await callApi("get", `/product/get/${params.id}`);
    setProduct(res);
  }, []);

  useEffect(() => {
    getProductData();
  }, []);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading luxury product…
      </div>
    );

  const productData = product[0];
  const images = JSON.parse(productData.images || "[]");
  

  return (
    <>
      <Nav />

      {/* MAIN WRAPPER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT – GALLERY */}
          <PictureGallery images={images} name={productData.product_name} />

          {/* RIGHT – INFO */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            {/* TITLE */}
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                Luxury Collection
              </p>

              <h1
                className="mt-3 text-3xl sm:text-4xl font-semibold text-black"
                style={{ fontFamily: "ui-serif, serif" }}
              >
                {productData.product_name}
              </h1>

              <h2>{productData.sub_category.replace('""'," ")}</h2>
            </div>

            {/* RATING */}
            <Star starNum={4} />

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-black">
                ₹{productData.price}
              </span>

              {productData.discount_price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{productData.discount_price}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed text-sm max-w-lg">
              {productData.description}
            </p>

            {/* QUANTITY */}
            <div className="w-40">
              <ItemCount Quanty={qty} stock={productData.stock} setItemscount={setQty} />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 max-w-sm">
              <Button
                onPress={() => {
                  AddCartProduct({ ...productData, qty });
                  notify({
                    message: "Added to cart",
                    type: "success",
                  });
                }}
                className="
                  bg-black text-white py-4 rounded-none
                  text-xs tracking-[0.2em] font-semibold
                  hover:bg-neutral-900 transition
                "
              >
                ADD TO CART
              </Button>

              <Button
                startContent={<Heart size={16} />}
                onPress={() => {
                  AddLikeProduct(productData);
                  notify({
                    message: "Added to wishlist",
                    type: "success",
                  });
                }}
                className="
                  border border-black py-4 rounded-none
                  text-xs tracking-[0.2em] font-semibold
                  hover:bg-black hover:text-white transition
                "
              >
                ADD TO WISHLIST
              </Button>
            </div>

            {/* DETAILS */}
            <div className="pt-6 border-t text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {productData.category_id}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
