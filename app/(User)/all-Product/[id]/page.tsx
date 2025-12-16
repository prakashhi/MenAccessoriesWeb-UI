"use client";

import Nav from "@/app/(User)/Component/NavBar/Nav";
import Footer from "@/app/(User)/Component/Footer/Footer";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import { UsePanel } from "@/context/Context";
import ItemCount from "@/app/(User)/Cart/component/ItemCount";
import Star from "@/app/(User)/Component/ProductList/Star";
import PictureGallery from "./Component/PictureGallery";
import { notify } from "@/app/(User)/Component/ToastComponent";
import { useApi } from "@/app/useApi";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProductDescription from "./Component/ProductDescription";

export default function ProductPage() {
  const params = useParams();
  const { callApi } = useApi();
  const { AddCartProduct, AddLikeProduct } = UsePanel();

  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);

  const getProductData = useCallback(async () => {
    const res = await callApi("get", `/product/${params.id}`);
    setProduct(res.data);
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

  const images = product.image
    .split("/")
    .filter(Boolean)
    .map((img: string) => `${process.env.NEXT_PUBLIC_IMG_URL}${img}`);

  const parsedDescription =
    typeof product?.description === "string" && product?.description
      ? JSON.parse(product?.description)
      : product?.description;

       console.log("vidoe0",product.video)

  return (
    <>
      <Nav />

      {/* MAIN WRAPPER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT – GALLERY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PictureGallery images={images} name={product.name} video={product.video} />
          </motion.div>

          {/* RIGHT – INFO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-8 lg:sticky lg:top-24"
          >
            {/* TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                Luxury Collection
              </p>

              <h1
                className="mt-3 text-3xl sm:text-4xl font-semibold text-black"
                style={{ fontFamily: "ui-serif, serif" }}
              >
                {product.name}
              </h1>

              <h3>{product.size}</h3>

              <h2 className="text-gray-300 text-sm mt-2.5">
                SKU: {product?.serialNumber}
              </h2>
            </motion.div>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-black">
                ₹ {product.sellingPrice}
              </span>

              {product.customPrice !== 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.customPrice}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}

            <ProductDescription
              description={parsedDescription.description}
              specifications={parsedDescription.specifications}
            />

            {/* QUANTITY */}
            <div className="w-40">
              <ItemCount
                Quanty={qty}
                stock={product.numberOfPieces}
                setItemscount={setQty}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 max-w-sm">
              <Button
                onPress={() => {
                  AddCartProduct(product.name, product.id);
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
                  AddLikeProduct(product.name, product.id);
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
                {product.categoryName}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
