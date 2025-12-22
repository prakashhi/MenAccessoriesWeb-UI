"use client";

import Nav from "@/app/(User)/Component/NavBar/Nav";
import Footer from "@/app/(User)/Component/Footer/Footer";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
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
import { getUserFromStorage } from "@/context/utils";
import { ImageShowUtil } from "@/app/utils/ImageShowUtil";

import {
  CartItem,
  VariantSize,
  LikeProductType,
  ProductInfoType,
} from "@/app/(User)/Type/Types";

interface ProductState {
  Like: boolean;
  Cart: boolean;
  LikeData: LikeProductType | null;
  CartData: CartItem | null;
}

export default function ProductPage() {
  const user = useMemo(() => getUserFromStorage(), []);
  const params = useParams();
  const { callApi } = useApi();
  const { LikeProductList, CartProductList } = UsePanel();

  const router = useRouter();
  const { AddCartProduct, AddLikeProduct, guestCart } = UsePanel();

  const [product, setProduct] = useState<ProductInfoType | null>(null);
  const [variants, setVariants] = useState<VariantSize | null>(null);
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [adding, setAdding] = useState(false);

  const [state, setState] = useState<ProductState>({
    Like: false,
    Cart: false,
    LikeData: null,
    CartData: null,
  });

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      try {
        // const [product, variants] = await Promise.all([
        //   callApi("get", `/product/${params.id}`),
        //   callApi("get", `/variants/size/product/${params.id}`),
        // ]);

        const [product, variants] = await Promise.all([
          callApi("get", `https://backend.9rock.in/product/${params.id}`),
          callApi("get", `/variants/size/product/${params.id}`),
        ]);

        if (active) {
          setProduct(product.data);
          setVariants(variants.data);
        }
      } catch (err) {
        console.error("Product fetch failed", err);
      } finally {
        if (active) setMounted(true);
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [params.id]);

  useEffect(() => {
    if (!product) return;

    let active = true;

    const syncUserData = async () => {
      try {
        // ✅ LOGGED-IN USER
        if (user?.id) {
          const [CartData, LikeData] = await Promise.all([
            CartProductList(user.id),
            LikeProductList(user.id),
          ]);

          if (!active) return;

          const like = LikeData.data.find(
            (i: any) => i.product.id == product.id
          );

          const cart = CartData.data.find(
            (i: any) => i.product.productId == product.id
          );

          setState((prev) => ({
            ...prev,
            LikeData: like ?? null,
            CartData: cart ?? null,
            Like: Boolean(like),
            Cart: Boolean(cart),
          }));
        }
        // ✅ GUEST USER
        else {
          setState((prev) => ({
            ...prev,
            Cart: Boolean(guestCart?.items?.[product.id]),
            Like: Boolean(guestCart?.likeProduct?.[product.id]),
          }));
        }
      } catch (err) {
        console.error("Cart/Like sync failed", err);
      }
    };

    syncUserData();

    return () => {
      active = false;
    };
  }, [product, user, guestCart]);

  if (!mounted) return null;

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading product…
      </div>
    );

  const isJsonString = (value: string) =>
    value.trim().startsWith("{") || value.trim().startsWith("[");

  const parsedDescription =
    typeof product?.description === "string" &&
    isJsonString(product.description)
      ? JSON.parse(product.description)
      : product?.description;

  const extraInfo = {
    Color: product.color,
    Size: product.size,
    weight: product.weight,
    // Material: product.materialUsedName,
  };
  const iscart = guestCart?.items?.[product.id];

  const addToCartHandle = async () => {
    setAdding(true);
    try {
      let res = await AddCartProduct(product);

      if (res) {
        setState((prev) => ({
          ...prev,
          Cart: true,
        }));

        setTimeout(() => setAdding(false), 600);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />

      {/* MAIN WRAPPER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid relative lg:grid-cols-2 gap-12 items-start">
          {/* LEFT – GALLERY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sticky top-0"
          >
            <PictureGallery
              images={[
                product.image,
                product.nineRockImage,
                // add more if backend sends later
              ]}
              video={product.video}
              name={product.name}
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
              <div>
                <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100 font-light text-sm">
                  {" "}
                  {product.categoryName?.toLocaleUpperCase()}
                </span>
              </div>
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

            {/* <ProductDescription
              extraInfo={extraInfo}
              description={parsedDescription.description}
              specifications={parsedDescription.specifications}
            /> */}

            <div className="space-y-4 pb-6">
              <h3 className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
                Description
              </h3>
              <div className=" underline  border border-b-1 border-gray-100"></div>

              <p className="text-gray-600 leading-relaxed text-sm">
                {parsedDescription.description}
              </p>
            </div>

            <h3 className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
              Details
            </h3>

            {/* SPECIFICATIONS */}
            <dl className="grid grid-cols-1 gap-y-4 text-sm">
              {parsedDescription.specifications &&
                Object.entries(parsedDescription.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-6 border-b border-gray-100 pb-2"
                    >
                      <dt className="text-gray-500 capitalize font-medium tracking-wide">
                        {key.replace(/([A-Z])/g, " $1")}
                      </dt>
                      <dd className="text-gray-800 text-right font-medium">
                        {value}
                      </dd>
                    </div>
                  )
                )}

              {extraInfo &&
                Object.entries(extraInfo).map(
                  ([key, value]) =>
                    value && (
                      <div
                        key={key}
                        className="flex justify-between gap-6 border-b border-gray-100 pb-2"
                      >
                        <dt className="text-gray-500 capitalize font-medium tracking-wide">
                          {key.replace(/([A-Z])/g, " $1")}
                        </dt>
                        <dd className="text-gray-800 text-right font-medium">
                          {value}
                        </dd>
                      </div>
                    )
                )}
            </dl>

            {/* QUANTITY */}

            {state.Cart == true && (
              <div className="w-40">
                <ItemCount
                  cartId={user && state.CartData?.id}
                  productId={product.id}
                  quantity={
                    user ? state.CartData?.quantity ?? 1 : iscart?.quantity ?? 1
                  }
                  stock={product.stock}
                  setState={(user && setState) || null}
                />
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 max-w-sm">
              <AnimatePresence mode="wait">
                {state.Cart == false ? (
                  <motion.button
                    key="add"
                    onClick={() => addToCartHandle()}
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
                      {state.Cart == false ? (
                        <motion.span
                          key="cart"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2 cursor-pointer"
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

              {state.Like == false ? (
                <Button
                  startContent={<Heart size={16} />}
                  onPress={() => {
                    AddLikeProduct(product);
                    setState((prev) => ({
                      ...prev,
                      Like: true,
                    }));
                  }}
                  className="
                  border border-black py-4 rounded-none
                  text-xs tracking-[0.2em] font-semibold
                  hover:bg-black hover:text-white transition
                "
                >
                  ADD TO WISHLIST
                </Button>
              ) : (
                <Button
                  startContent={<Heart size={16} />}
                  onPress={() => {
                    router.push("/Wishlist");
                  }}
                  className="
                  border border-black py-4 rounded-none
                  text-xs tracking-[0.2em] font-semibold
                  hover:bg-black hover:text-white transition
                "
                >
                  Saved
                </Button>
              )}
            </div>

            {/* DETAILS */}
            {/* <div className="pt-6 border-t text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.categoryName}
              </p>
            </div> */}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
