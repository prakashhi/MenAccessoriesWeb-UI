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
import { useApi } from "@/app/useApi";
import { motion, useScroll, useTransform } from "framer-motion";

import ProductDescription from "./Component/ProductDescription";
import { formatIndianPrice } from "@/app/utils/FormatCurrency";

import { AnimatePresence } from "framer-motion";
import { RiShoppingCart2Line, RiCheckLine } from "react-icons/ri";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const { callApi } = useApi();

  const router = useRouter();
  const { AddCartProduct, AddLikeProduct, guestCart } = UsePanel();

  const [product, setProduct] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [adding, setAdding] = useState(false);

  const getProductData = useCallback(async () => {
    const res = await callApi(
      "get",
      `https://backend.9rock.in/product/${params.id}`
    );
    setProduct(res.data);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    getProductData();
  }, [mounted]);

  if (!mounted) return null;

  // useEffect(() => {
  //   getProductData();
  // }, []);

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

  const extraInfo = {
    Color: product.color,
    Size: product.size,
    weight: product.weight,
    // Material: product.materialUsedName,
  };

  let iscart = guestCart.items[product.id];

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
            <PictureGallery
              images={images}
              name={product.name}
              video={product.video}
            />
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

              <h2 className="text-gray-300 text-sm mt-2.5">
                SKU: {product?.serialNumber}
              </h2>
            </motion.div>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-black">
                ₹ {formatIndianPrice(product.sellingPrice)}
              </span>

              {product.customPrice !== 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{formatIndianPrice(product.customPrice)}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}

            <ProductDescription
              extraInfo={extraInfo}
              description={parsedDescription.description}
              specifications={parsedDescription.specifications}
            />

            {/* QUANTITY */}

            <div className="w-40">
              <ItemCount
                productId={product.id}
                quantity={iscart?.quantity || 1}
                stock={product.stock}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 max-w-sm">
              <AnimatePresence mode="wait">
                {!iscart ? (
                  <motion.button
                    key="add"
                    onClick={async () => {
                      setAdding(true);
                      await AddCartProduct(product);
                      setTimeout(() => setAdding(false), 600);
                    }}
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="
        relative flex items-center justify-center gap-3
        bg-black text-white py-4 rounded-none
        text-xs tracking-[0.25em] font-semibold
        overflow-hidden
      "
                  >
                    <AnimatePresence mode="wait">
                      {!iscart ? (
                        <motion.span
                          key="cart"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2"
                        >
                          <RiShoppingCart2Line size={16} />
                          ADD TO CART
                        </motion.span>
                      ) : (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="flex items-center gap-2 text-emerald-400"
                        >
                          <RiCheckLine size={18} />
                          ADDED
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => setRedirecting(true)}
                    whileHover="hover"
                    animate={redirecting ? "exit" : "rest"}
                    variants={{
                      rest: { x: 0, opacity: 1 },
                      hover: { x: 6 },
                      exit: {
                        x: 120,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      },
                    }}
                    onAnimationComplete={(variant) => {
                      if (variant === "exit") router.push("/Cart");
                    }}
                    className="
    group relative flex items-center cursor-pointer justify-center gap-3
    bg-white text-black py-4 border border-black
    rounded-none text-xs tracking-[0.25em] font-semibold
    overflow-hidden
  "
                  >
                    <motion.span
                      variants={{
                        rest: { x: 0 },
                        hover: { x: 4 },
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      SHOW IN CART
                      <motion.span
                        variants={{
                          rest: { x: -6, opacity: 0 },
                          hover: { x: 0, opacity: 1 },
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <MoveRight size={14} />
                      </motion.span>
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>

              <Button
                startContent={<Heart size={16} />}
                onPress={() => {
                  AddLikeProduct(product);
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
