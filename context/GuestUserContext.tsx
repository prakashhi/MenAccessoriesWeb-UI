"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { product, Like } from "@/Type/GuestType";

import { notify, toastActions } from "@/Component/ToastComponent";
import { getUserFromStorage, getGuestCart } from "./utils";

import { GuestCart, GuestCartItem } from "@/Type/GuestType";

import { RemoveCartResponse, CartItem } from "@/Type/CartType";
import { getProduct, getProductId } from "@/utils/getProductId";
import { ProductInfoType } from "@/Type/ProductType";

type PanelContextType = {
  AddCartProductGuest: (
    Product: ProductInfoType,
    variantSizeId?: string | null,
    size?: string | null,
    VariantStock?: number
  ) => void;
  RemoveGuestCartProduct: (ProductId: string) => void;

  guestCart: GuestCart;

  AddGuestLikeProduct: (
    Product: ProductInfoType,
    variantSizeId?: string | null | undefined
  ) => void;
  RemoveGuestLikeProduct: (ProductId: string) => void;

  incrementGuestCartProduct: (productId: string) => void;
  decrementGuestCartProduct: (productId: string) => void;
  GuestUserDataLength: { Cart: number; Like: number };
  setCartProductQty: (productId: string, qty: number) => Promise<void>;

  guestTriggerRefresh: () => void;

  guestDataClear: () => void;
};

const GuestUserContext = createContext<PanelContextType | null>(null);

export const useGuestUser = (): PanelContextType => {
  const context = useContext(GuestUserContext);
  if (!context) {
    throw new Error(
      "useGuestUser must be used within SearchPanelContextProvider"
    );
  }

  return context;
};

export function GuestUserContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [guestCart, setGuestCart] = useState<GuestCart>(() => {
    if (typeof window === "undefined") {
      return { items: {}, likeProduct: {} };
    }
    return getGuestCart();
  });

  const [guestRefresh, setGuestRefresh] = useState<number>(0);

  const [mounted, setMounted] = useState(false);

  // 1️⃣ Mark client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2️⃣ Read localStorage AFTER mount
  useEffect(() => {
    if (!mounted) return;

    const LoadCountData = async () => {
      const cart = getGuestCart();

      setGuestCart((prev) => ({
        ...prev,
        items: cart.items,
        likeProduct: cart.likeProduct,
      }));
    };

    LoadCountData();
  }, [mounted]);

  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!mounted || !guestCart) return;

    if (!hasHydrated.current) {
      hasHydrated.current = true;
      return; // ⛔ skip first write
    }

    localStorage.setItem("GuestUserData", JSON.stringify(guestCart));
  }, [guestCart, mounted]);

  const GuestUserDataLength = useMemo(() => {
    return {
      Cart: Object.keys(guestCart?.items || {}).length,
      Like: Object.keys(guestCart?.likeProduct || {}).length,
    };
  }, [guestCart, guestRefresh]);

  //*******Cart Functions******
  const AddCartProductGuest = (
    Product: ProductInfoType,
    variantSizeId?: string | null,
    size?: string | null,
    VariantStock?: number
  ) => {
    let productData = getProduct(Product);

    let productId = productData.id;

    let added = false;
    let exist = false;
    setGuestCart((prev: any) => {
      if (!prev) return prev;

      // prevent duplicate
      if (prev.items[productId]) {
        exist = true;
        return prev;
      }

      added = true;
      return {
        ...prev,
        items: {
          ...prev.items,
          [productId]: {
            ...productData,
            quantity: 1,
            variantSizeId: variantSizeId || null,
            size: size || null,
            VariantStock: VariantStock || null,
          },
        },
      };
    });

    if (exist) {
      notify({
        message: "Product is already exits in cart",
        type: "warning",
      });
    }

    if (added) {
      toastActions.addToCart(`${Product.name}`);
    }
  };

  const RemoveGuestCartProduct = (ProductId: string, VariantId?: string) => {
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

    toastActions.removeFromCart();
  };

  //******Like Functions*******
  const AddGuestLikeProduct = (
    Product: ProductInfoType,
    variantSizeId?: string | null
  ) => {
    let productData = getProduct(Product);
    let productId = productData.id;
    let shouldNotify = false;
    setGuestCart((prev) => {
      if (prev.likeProduct[productId]) return prev;

      shouldNotify = true;
      return {
        ...prev,
        likeProduct: {
          ...prev.likeProduct,
          [productId]: {
            ...productData,
            variantSizeId,
          },
        },
      };
    });

    if (shouldNotify) {
      toastActions.addToWishlist();
    }
  };

  const RemoveGuestLikeProduct = async (ProductId: string) => {
    setGuestCart((prev) => {
      if (!prev || !prev.likeProduct) return prev;

      if (!prev.likeProduct[ProductId]) return prev;

      const newItems = { ...prev.likeProduct };
      delete newItems[ProductId];

      return {
        ...prev,
        likeProduct: newItems,
      };
    });

    return {
      success: true,
      data: null,
    };
  };

  //**** CartCount Function*****
  const incrementGuestCartProduct = (productId: string) => {
    setGuestCart((prev) => {
      if (!prev) return prev;
      const item = prev.items[productId];
      if (!item) return prev;

      // 🚫 prevent exceeding stock
      if (item.quantity && item.quantity >= item.stock) return prev;

      return {
        ...prev,
        items: {
          ...prev.items,
          [productId]: {
            ...item,
            quantity: item.quantity && item.quantity + 1,
          },
        },
      };
    });
  };

  const decrementGuestCartProduct = (productId: string) => {
    setGuestCart((prev) => {
      if (!prev) return prev;

      const item = prev.items[productId];
      if (!item || (item.quantity && item.quantity <= 1)) return prev;

      return {
        ...prev,
        items: {
          ...prev.items,
          [productId]: {
            ...item,
            quantity: item.quantity && item.quantity - 1,
          },
        },
      };
    });
  };

  const setCartProductQty = async (productId: string, qty: number) => {
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
  };

  const guestTriggerRefresh = () => {
    setGuestRefresh((prev) => prev + 1);
  };

  const guestDataClear = () => {
    setGuestCart((prev) => ({
      ...prev,
      items: {},
      likeProduct: {},
    }));
  };

  return (
    <GuestUserContext.Provider
      value={{
        guestCart,
        AddCartProductGuest,
        RemoveGuestCartProduct,
        AddGuestLikeProduct,
        RemoveGuestLikeProduct,
        incrementGuestCartProduct,
        decrementGuestCartProduct,
        GuestUserDataLength,
        setCartProductQty,
        guestTriggerRefresh,

        guestDataClear,
      }}
    >
      {children}
    </GuestUserContext.Provider>
  );
}
