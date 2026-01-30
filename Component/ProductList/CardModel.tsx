"use client";

import { UsePanel } from "@/context/Context";
import Image from "next/image";
import { FcLikePlaceholder } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useApi } from "@/app/useApi";
import { PriceShowFunction } from "@/utils/FormatCurrency";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { RiShoppingCart2Line } from "react-icons/ri";

import { Heart } from "lucide-react";
import { Data} from "@/Type/Types";
import { ProductInfoType } from "@/Type/ProductType";
import { ImageShowUtil } from "@/utils/ImageShowUtil";
import { notify, toastActions } from "../ToastComponent";
import { useUserLike } from "@/context/UserLikeContext";
import { useGuestUser } from "@/context/GuestUserContext";
import { useUserCart } from "@/context/UserCartContext";

type BaseProduct = {
  id: string;
  name: string;
  code: string;
  sellingPrice: number;
  image: string;
  stock?: number;
  categoryName?: string;
};

export default function CardModel<T extends BaseProduct>({
  DataObj,
  CustomWH,
  Data,
  isUser,
  setState,
  categoryName,
}: {
  DataObj: T[];
  CustomWH?: string;
  Data: Data;
  isUser?: boolean;

  setState: React.Dispatch<React.SetStateAction<Data>>;
  categoryName?: string;
}) {
  const { callApi } = useApi();

  const { setUserCountData } = UsePanel();

  const { AddCartProduct } = useUserCart();

  const { AddCartProductGuest, guestCart } = useGuestUser();

  const { RemoveLikeProduct, AddLikeProduct } = useUserLike();

  const { RemoveGuestLikeProduct, AddGuestLikeProduct } = useGuestUser();

  const router = useRouter();

  if (DataObj?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 tracking-widest">NO PRODUCTS FOUND</p>
      </div>
    );
  }

  const handleAddToCart = async (productId: string) => {
    try {
      let product: ProductInfoType = await callApi(
        "get",
        `/product/${productId}`
      );

      if (isUser == true) {
        let response = await AddCartProduct(productId, product.variantId);

        if (response.success == true) {
          setState((prev: any) => {
            const prevItem = prev.CartData[productId];
            return {
              ...prev,
              CartData: {
                ...prev.CartData,
                [productId]: {
                  id: productId,
                  product: product,
                  variantSize: prevItem?.variantSize ?? product.size ?? null, // optional
                  quantity: (prevItem?.quantity ?? 0) + 1,
                },
              },
            };
          });

          setUserCountData((prev) => ({
            ...prev,
            CartCount: prev.CartCount + 1,
          }));

          toastActions.addToCart();
        } else {
          notify({
            message: response.message,
            type: "warning",
          });
        }
      } else {
        AddCartProductGuest(product);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addLikeToState = (productId: string, product: ProductInfoType) => {
    setState((prev: Data) => {
      const newLike = {
        likeId: crypto.randomUUID(), // required
        product, // matches ProductInfoType
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        LikeData: {
          ...prev.LikeData,
          [productId]: newLike, // ✅ correct type
        },
      };
    });
  };

  const removeLikeFromState = (productId: string) => {
    setState((prev: Data) => {
      const { [productId]: _, ...rest } = prev.LikeData;
      return {
        ...prev,
        LikeData: rest,
      };
    });
  };

  const handleAddToLike = async (productId: string) => {
    try {
      let product = await callApi("get", `/product/${productId}`);

      if (isUser) {
        try {
          let res = await AddLikeProduct(product.data);
          if (res.success == true) {
            const isLiked = Boolean(Data.LikeData[productId]);

            if (isLiked) {
              removeLikeFromState(productId);
            } else {
              addLikeToState(productId, product);
            }

            setUserCountData((prev) => ({
              ...prev,
              LikeCount: prev.LikeCount + 1,
            }));

            toastActions.addToWishlist();
          }
        } catch (err: any) {
          notify({
            message: err.message || "Something wrong",
            type: "warning",
          });
        }
      } else {
        AddGuestLikeProduct(product, null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnLike = async (productId: string) => {
    if (isUser) {
      try {
        let res = await RemoveLikeProduct(productId);

        if (res.success == true) {
          setState((prev) => {
            if (!prev.LikeData[productId]) return prev;

            const { [productId]: _, ...rest } = prev.LikeData;

            return {
              ...prev,
              LikeData: rest,
            };
          });

          setUserCountData((prev) => ({
            ...prev,
            LikeCount: prev.LikeCount - 1,
          }));
        }
      } catch (err: any) {
        notify({
          message: err.message,
          type: "warning",
        });
      }
    } else {
      RemoveGuestLikeProduct(productId);
      toastActions.removeFromWishlist();
    }
  };

  return (
    <>
      {DataObj?.length > 0 &&
        DataObj.map((product, index) => {
          let iscart = isUser
            ? !!Data.CartData?.[product.id]
            : !!guestCart?.items?.[product.id];
          let isLike = isUser
            ? !!Data.LikeData?.[product.id]
            : !!guestCart?.likeProduct?.[product.id];

          return (
            <div
              key={index}
              className={`
            group relative bg-white rounded-2xl overflow-hidden
            border border-gray-100 shadow-sm
            hover:shadow-2xl hover:-translate-y-2
            transition-all duration-500
            ${CustomWH ?? "w-72"}
          `}
            >
              {/* IMAGE */}

              <div
                onClick={() => router.push(`/all-Product/${product.id}`)}
                className="relative w-full h-82 cursor-pointer overflow-hidden"
              >
                <Image
                  src={ImageShowUtil(product?.image)}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* Wishlist */}
                {isLike == true ? (
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition">
                    <Heart
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnLike(product.id);
                      }}
                      className="w-5 h-5 text-red-600 fill-red-600"
                    />
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToLike(product.id);
                    }}
                    className="absolute cursor-pointer top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition"
                  >
                    <FcLikePlaceholder className="text-xl" />
                  </button>
                )}

                {/* Hover Content */}
              </div>

              {/* INFO */}
              <div className="px-4 py-3 text-center space-y-1">
                <h3 style={{fontFamily:"sans-serif"}} className="text-sm font-semibold text-gray-900 line-clamp-1">
                  {product.name.trim() !== "" ? product.name : categoryName ?? product.categoryName}
                </h3>

                <div className="flex justify-center gap-2 items-center">
                  <span className="text-base font-bold text-gray-900">
                    ₹{PriceShowFunction(product.code, product.sellingPrice)}
                  </span>
                </div>

                <div
                  className="
    right-0 p-2
    translate-y-0
    
    transition-all duration-500
  "
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                      e.stopPropagation();

                      let stock = product.stock ?? null; // if stock is undefined, set null

                      if (stock !== null) {
                        // Stock exists, check if available
                        if (stock > 0) {
                          // Product in stock, allow adding to cart
                          if (!iscart) {
                            handleAddToCart(product.id);
                          } else {
                            router.push("/cart");
                          }
                        }
                      } else {
                        // Stock does not exist → allow function
                        if (!iscart) {
                          handleAddToCart(product.id);
                        } else {
                          router.push("/cart");
                        }
                      }
                    }}
                    className={`
    w-full py-3 rounded-md bg-white border 
     text-white text-sm font-semibold
    flex items-center justify-center gap-2
    md:bg-white md:text-neutral-900
    md:hover:bg-gray-100 ${
      product.stock !== undefined && product.stock <= 0
        ? "cursor-not-allowed border-none"
        : "cursor-pointer border-gray-100"
    } md:hover:text-white
    transition-colors duration-300
                    `}
                  >
                    {product.stock !== undefined && product.stock <= 0 ? (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex  text-gray-400  items-center gap-2 cursor-not-allowed"
                      >
                        OUT OF STOCK
                      </motion.span>
                    ) : (
                      <AnimatePresence mode="wait">
                        {!iscart ? (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex  text-gray-400 items-center gap-2 cursor-pointer"
                          >
                            <RiShoppingCart2Line size={16} />
                            ADD TO CART
                          </motion.span>
                        ) : (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="flex items-center cursor-pointer gap-2 text-emerald-600 "
                          >
                            <motion.span
                              initial={{ scale: 0.85 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                              <CircleCheck size={18} />
                            </motion.span>
                            ADDED
                          </motion.span>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
