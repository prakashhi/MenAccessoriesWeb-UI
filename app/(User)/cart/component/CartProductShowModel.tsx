import { ImageShowUtil } from "@/utils/ImageShowUtil";
import { motion } from "framer-motion";

import Image from "next/image";
import { PriceTable } from "./PriceTable";
import { useRouter } from "next/navigation";
import ItemCount from "./ItemCount";
import { useUserCart } from "@/context/UserCartContext";
import { useGuestUser } from "@/context/GuestUserContext";
import { CartItem } from "@/Type/CartType";

import { GuestCartItem } from "@/Type/GuestType";
import { notify, toastActions } from "@/Component/ToastComponent";
import { UsePanel } from "@/context/Context";

type CartListItem = GuestCartItem | CartItem;

export default function CartProductShowModel({
  item,
  index,
  user,
  setCartListData,
}: {
  item: any;
  index: number;
  user: any;
  setCartListData: React.Dispatch<React.SetStateAction<CartListItem[]>>;
}) {
  const { CartProductList, RemoveCartProduct } = useUserCart();

  const { guestCart, RemoveGuestCartProduct } = useGuestUser();
  const { setUserCountData } = UsePanel();

  const handleRemove = async (item: any) => {
    if (user) {
      try {
        let response = await RemoveCartProduct(
          item.product.productId,
          item.variantSize?.variantSizeId
        );

        if (response.success == true) {
          setCartListData((prev) =>
            prev.filter(
              (p: any) => p.product.productId !== item.product.productId
            )
          );

          setUserCountData((prev) => ({
            ...prev,
            CartCount: prev.CartCount - 1,
          }));

          toastActions.removeFromWishlist();
        }
      } catch (err: any) {
        notify({
          message: err.message,
          type: "warning",
        });
      }
    } else {
      RemoveGuestCartProduct(item.id);
    }
  };

  console.log("item", item);

  const changeCartState = (cartId: string, quantity: number) => {
    setCartListData((prev) =>
      prev.map((item) => {
        if (item.id !== cartId) return item;

        return {
          ...item,
          quantity,
        };
      })
    );
  };
  const router = useRouter();
  return (
    <>
      <motion.div
        key={item.id || index}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="
    grid
    grid-cols-1
    sm:grid-cols-[112px_1fr]
    gap-4
    p-4 sm:p-5
    bg-white
     border border-gray-50
    rounded-xl
    shadow-sm
    items-center
  "
      >
        {/* IMAGE */}
        <div
          className="
      relative
      w-full h-40
      sm:w-28 sm:h-28
      rounded-lg
      overflow-hidden
      bg-neutral-100
      cursor-pointer
    "
          onClick={() =>
            router.push(
              `/all-Product/${user ? item.product.productId : item.id}`
            )
          }
        >
          <Image
            alt={item.name || "Product"}
            fill
            sizes="(max-width:640px) 100vw, 112px"
            src={
              ImageShowUtil(user ? item.product?.productImage : item?.image) ||
              "/images/placeholder.webp"
            }
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between gap-1">
          {/* TITLE */}
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-neutral-900 line-clamp-2">
              {user
                ? item.product.productName.trim() !== ""
                  ? item.product.productName
                  : item.product.categoryName
                : item.name.trim() !== ""
                ? item.name
                : item.categoryName}
            </h3>
            <p className="text-xs text-neutral-400">
              {user ? item.product.categoryName : item.categoryName}
            </p>
            {item.size && (
              <p className="text-xs text-neutral-500 mt-1">Size: {item.size}</p>
            )}
          </div>

          <div
            className="
    grid
    grid-cols-1
    gap-3
    sm:grid-cols-[auto_1fr]
    sm:items-center
  "
          >
            {/* LEFT: QTY CONTROL */}
            <div className="sm:justify-self-start">
              <ItemCount
                productId={user ? item.product.productId : item.id}
                quantity={item.quantity}
                stock={user ? item.product.stock : item.stock}
                cartId={user ? item.id : undefined}
                setState={user ? setCartListData : undefined}
                VariantStock={
                  user
                    ? item?.variantSize?.variantSizeStock
                    : item.VariantStock ?? null
                }
                stateChangeQuantity={changeCartState}
              />
            </div>

            <PriceTable item={item} user={user} />
          </div>

          {/* REMOVE */}
          <button
            onClick={() => handleRemove(item)}
            className="text-[11px] md:mt-0 mt-5 cursor-pointer uppercase tracking-widest text-neutral-400 hover:text-neutral-900 w-fit"
          >
            Remove
          </button>
        </div>
      </motion.div>
    </>
  );
}
