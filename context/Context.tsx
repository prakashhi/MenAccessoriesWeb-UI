"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { product } from "./Types/type";
import { useDisclosure } from "@heroui/react";
import { useApi } from "@/app/useApi";
import { notify } from "@/app/(User)/Component/ToastComponent";
import {
  getUserFromStorage,
  getGuestCart,
  saveGuestCart,
  updateGuestCart,
} from "./utils";

type PanelContextType = {
  cartProduct: product[];
  setCartProduct: React.Dispatch<React.SetStateAction<product[]>>;
  AddCartProduct: (Product: product) => Promise<void>;
  RemoveCartProduct: (id: string) => Promise<void>;
  guestCart: any; // You can define a proper type for GuestCart if needed
  AddLikeProduct: (productName: string, ProductId: string) => Promise<void>;
  RemoveLikeProduct: (ProductId: string) => Promise<void>;
  LikeProductList: () => Promise<any>;
  CartProductList: () => Promise<any>;
  incrementCartProduct: (productId: string) => Promise<void>;
  decrementCartProduct: (productId: string) => Promise<void>;
  setCartProductQty: (productId: string, qty: number) => Promise<void>;
  isOpen: boolean;
  loading: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

const SearchPanelContext = createContext<PanelContextType | null>(null);

export const UsePanel = () => useContext(SearchPanelContext);

export function SearchPanelContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartProduct, setCartProduct] = useState<product[]>([]);
  const [guestCart, setGuestCart] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 1️⃣ Mark client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2️⃣ Read localStorage AFTER mount
  useEffect(() => {
    if (!mounted) return;

    const userData = getUserFromStorage();
    setUser(userData);

    const cart = getGuestCart(); // safe now
    setGuestCart(cart);
  }, [mounted]);

  const id = user?.id;

  // 3️⃣ Persist changes
  useEffect(() => {
    if (!mounted || !guestCart) return;

    localStorage.setItem("GuestUserData", JSON.stringify(guestCart));
  }, [guestCart, mounted]);

  console.log(guestCart);

  const { callApi, loading } = useApi();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // All functions
  const AddCartProduct = async (Product: product) => {
    // console.log(Product,user);
    if (user == null || !user) {
      let added = false;
      setGuestCart((prev) => {
        if (!prev) return prev;

        // prevent duplicate
        if (prev.items[Product.id]) return prev;

        added = true;
        return {
          ...prev,
          items: {
            ...prev.items,
            [Product.id]: {
              code: Product.code,
              id: Product.id,
              image: Product.image,
              name: Product.name,
              sellingPrice: Product.sellingPrice,
              seqId: Product.seqId,
              stock: Product.stock || 10,
              quantity: 1,
            },
          },
        };
      });

      if (added) {
        notify({
          message: `${Product.name} added to cart`,
          type: "success",
        });
      }
    } else {
      let response = await callApi("post", "/cart", {
        data: {
          productId: Product.id,
          userId: id,
        },
      });

      if (response.success == true) {
        notify({
          message: `${Product.name} added to Cart`,
          type: "success",
        });
      } else {
        notify({
          message: response.message || "Something went wrong",
          type: "error",
        });
      }
    }
  };

  const RemoveCartProduct = async (ProductId: string) => {
    if (user == null || !user) {
      setGuestCart((prev) => {
        if (!prev) return prev;

        if (!prev.items[ProductId]) return prev;

        const newItems = { ...prev.items };
        delete newItems[ProductId];

        return {
          ...prev,
          items: newItems,
        };
      });

      notify({
        message: "Cart item deleted successfully",
        type: "info",
      });
    } else {
      let response = await callApi("delete", `/cart/${userId}/${id}`);

      if (response.success == true) {
        notify({
          message: response.message || "Cart item deleted successfully",
          type: "success",
        });
      } else {
        notify({
          message: response.message || "Something went wrong",
          type: "error",
        });
      }
    }
  };

  const AddLikeProduct = async (productName: string, ProductId: string) => {
    let response = await callApi("post", "/like-product", {
      data: {
        productId: ProductId,
        userId: id,
      },
    });

    if (response.success == true) {
      notify({
        message: `${productName} added to Wishlist`,
        type: "success",
      });
    } else {
      notify({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const RemoveLikeProduct = async (ProductId: string) => {
    let response = await callApi("delete", `/like-product/${id}/${ProductId}`);

    if (response.success == true) {
      notify({
        message: response.message || "Like product deleted successfully",
        type: "success",
      });
    } else {
      notify({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const incrementCartProduct = async (productId: string) => {
    if (user == null || !user) {
      setGuestCart((prev) => {
        if (!prev) return prev;
        const item = prev.items[productId];
        if (!item) return prev;

        // 🚫 prevent exceeding stock
        if (item.quantity >= item.stock) return prev;

        return {
          ...prev,
          items: {
            ...prev.items,
            [productId]: {
              ...item,
              quantity: item.quantity + 1,
            },
          },
        };
      });
    } else {
      let response = await callApi("patch", `/cart/{cartId}`);
    }
  };

  const decrementCartProduct = async (productId: string) => {
    if (user == null || !user) {
      setGuestCart((prev) => {
        if (!prev) return prev;

        const item = prev.items[productId];
        if (!item || item.quantity <= 1) return prev;

        return {
          ...prev,
          items: {
            ...prev.items,
            [productId]: {
              ...item,
              quantity: item.quantity - 1,
            },
          },
        };
      });
    } else {
      let response = await callApi("patch", `/cart/{cartId}`);
    }
  };

  const setCartProductQty = async (productId: string, qty: number) => {
    if (user == null || !user) {
      setGuestCart((prev) => {
        if (!prev) return prev;
        const item = prev.items[productId];
        if (!item) return prev;

        return {
          ...prev,
          items: {
            ...prev.items,
            [productId]: {
              ...item,
              quantity: Math.max(1, Math.min(qty, item.stock)),
            },
          },
        };
      });
    } else {
      // API call for logged-in
    }
  };

  const LikeProductList = async () => {
    let response = await callApi("get", `/like-products/${id}`);

    // if (response.success !== true) {
    //   notify({
    //     message: response.message || "Something went wrong",
    //     type: "error",
    //   });
    // }

    return response;
  };

  const CartProductList = async () => {
    let response = await callApi("get", `/cart/${id}`);

    // if (response.success !== true) {
    //   notify({
    //     message: response.message || "Something went wrong",
    //     type: "error",
    //   });
    // }

    return response;
  };
  return (
    <SearchPanelContext.Provider
      value={{
        setCartProduct,
        AddCartProduct,
        RemoveCartProduct,
        cartProduct,
        guestCart,
        AddLikeProduct,
        RemoveLikeProduct,
        LikeProductList,
        CartProductList,
        incrementCartProduct,
        decrementCartProduct,
        setCartProductQty,
        isOpen,
        loading,
        onOpen,
        onOpenChange,
      }}
    >
      {children}
    </SearchPanelContext.Provider>
  );
}
