"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { product, Like } from "./Types/type";
import { useDisclosure } from "@heroui/react";
import { useApi } from "@/app/useApi";
import { notify, toastActions } from "@/app/(User)/Component/ToastComponent";
import {
  getUserFromStorage,
  getGuestCart,
  saveGuestCart,
  updateGuestCart,
} from "./utils";

import {
  CartItem,
  CartProductInfo,
  ProductInfoType,
  LikeProductType,
} from "@/app/(User)/Type/Types";

type GuestCartItem = product & { quantity: number };

type GuestCart = {
  items: Record<string, GuestCartItem>;
  likeProduct: Record<string, GuestCartItem>;
};

type AddToCart = product | ProductInfoType;

type PanelContextType = {
  cartProduct: product[];
  setCartProduct: React.Dispatch<React.SetStateAction<product[]>>;
  AddCartProduct: (Product: AddToCart) => Promise<void>;
  RemoveCartProduct: (id: string) => Promise<void>;
  guestCart: GuestCart;
  AddLikeProduct: (Product: product) => Promise<void>;
  RemoveLikeProduct: (ProductId: string) => Promise<void>;
  LikeProductList: (userid: string) => Promise<any>;
  CartProductList: (userid: string) => Promise<any>;
  incrementCartProduct: (
    productId: string,
    cardId: string,
    quantity: number
  ) => Promise<void>;
  decrementCartProduct: (
    productId: string,
    cardId: string,
    quantity: number
  ) => Promise<void>;
  setCartProductQty: (productId: string, qty: number) => Promise<void>;
  isOpen: boolean;
  loading: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  GuestUserDataLength: { Cart: number; Like: number };
};

const SearchPanelContext = createContext<PanelContextType | null>(null);

export const UsePanel = () => {
  const context = useContext(SearchPanelContext);

  if (!context) {
    throw new Error("UsePanel must be used inside SearchPanelContextProvider");
  }

  return context;
};

export function SearchPanelContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { callApi, loading } = useApi();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cartProduct, setCartProduct] = useState<product[]>([]);
  const [guestCart, setGuestCart] = useState<GuestCart>({
    items: {},
    likeProduct: {},
  });

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

    const cart = getGuestCart();

    // console.log(cart);

    // if (cart) {
    //   setGuestCart(cart); // ✅ restore FULL cart
    // }

    setGuestCart((prev) => ({
      ...prev,
      items: cart.items,
      likeProduct: cart.likeProduct,
    }));
  }, [mounted]);

  const id = user?.id;

  // 3️⃣ Persist changes
  useEffect(() => {
    if (!mounted || !guestCart) return;

    localStorage.setItem("GuestUserData", JSON.stringify(guestCart));
  }, [guestCart, mounted]);

  const GuestUserDataLength = useMemo(() => {
    return {
      Cart: Object.keys(guestCart?.items || {}).length,
      Like: Object.keys(guestCart?.likeProduct || {}).length,
    };
  }, [guestCart]);

  // All functions
  const AddCartProduct = async (Product: AddToCart) => {
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
        toastActions.addToCart(`${Product.name}`);
      }
    } else {
      try {
        let response = await callApi("post", "/cart", {
          data: {
            productId: Product.id,
            userId: id,
            variantSizeId: Product.variantId ?? null,
          },
        });

        return response;
      } catch (err) {
        console.log(err);
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

      toastActions.removeFromCart();
    } else {
      let response = await callApi("delete", `/cart/${id}/${ProductId}`);

      if (response.success == true) {
        toastActions.removeFromCart();
      }
    }
  };

  const AddLikeProduct = async (Product: product): Promise<void> => {
    if (user == null || !user) {
      let shouldNotify = false;
      setGuestCart((prev) => {
        if (prev.likeProduct[Product.id]) return prev;

        // const likeProduct = prev.likeProduct || {};

        // prevent duplicate
        // if (likeProduct[Product.id]) return prev;

        shouldNotify = true;
        return {
          ...prev,
          likeProduct: {
            ...prev.likeProduct,
            [Product.id]: {
              code: Product.code,
              id: Product.id,
              image: Product.image,
              name: Product.name,
              sellingPrice: Product.sellingPrice,
              seqId: Product.seqId,
              stock: Product.stock ?? 2,
            },
          },
        };
      });

      if (shouldNotify) {
        toastActions.addToWishlist(`${Product.name}`);
      }

      return;
    } else {
      let response = await callApi("post", "/like-product", {
        data: {
          productId: Product.id,
          userId: id,
        },
      });

      return response;
      // if (response.success == true) {
      //   toastActions.addToWishlist(`${Product.name}`);
      // }
    }
  };

  const RemoveLikeProduct = async (ProductId: string) => {
    if (user == null || !user) {
      setGuestCart((prev) => {
        if (!prev) return prev;

        if (!prev.likeProduct[ProductId]) return prev;

        const newItems = { ...prev.likeProduct };
        delete newItems[ProductId];

        return {
          ...prev,
          likeProduct: newItems,
        };
      });

      //toastActions.removeFromWishlist();
    } else {
      let response = await callApi(
        "delete",
        `/like-product/${id}/${ProductId}`
      );
      if (response) {
        toastActions.removeFromWishlist();
      }
    }
  };

  const incrementCartProduct = async (
    productId: string,
    cardId: string,
    quantity: number
  ) => {
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
      await callApi("patch", `/cart/${cardId}`, {
        data: { quantity: quantity },
      });
    }
  };

  const decrementCartProduct = async (
    productId: string,
    cardId: string,
    quantity: number
  ) => {
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
      await callApi("patch", `/cart/${cardId}`, {
        data: { quantity: quantity },
      });
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

  const LikeProductList = async (userid: string) => {
    if (user !== null || !user) {
      let response = await callApi("get", `/like-products/${userid}`);
      return response;
    }
  };

  const CartProductList = async (userid: string) => {
    if (user !== null || !user) {
      let response = await callApi("get", `/cart/${userid}`);
      return response;
    }
  };

  return (
    <SearchPanelContext.Provider
      value={{
        setCartProduct,
        AddCartProduct,
        RemoveCartProduct,
        GuestUserDataLength,
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
