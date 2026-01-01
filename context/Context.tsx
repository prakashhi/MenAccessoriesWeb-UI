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
import { getUserFromStorage, getGuestCart } from "./utils";

import {
  CartItem,
  CartProductInfo,
  LikeProductType,
  ApiResponse,
  User,
  GuestCart,
  GuestCartItem,
  CountStateType,
  RemoveCartResponse,
  PromiseSettledResult,
  AddCartProductResponse,
} from "@/app/(User)/Type/Types";

type PanelContextType = {
  cartProduct: product[];
  setCartProduct: React.Dispatch<React.SetStateAction<product[]>>;

  AddCartProduct: (
    ProductId: string,
    variantSizeId?: string | null,
    size?: string | null
  ) => Promise<ApiResponse<AddCartProductResponse> | undefined>;

  AddCartProductGuest: (
    Product: GuestCartItem,
    variantSizeId?: string | null | undefined,
    size?: string | null
  ) => Promise<void>;

  userCountData: CountStateType;
  setUserCountData: React.Dispatch<React.SetStateAction<CountStateType>>;

  RemoveCartProduct: (
    id: string,
    VariantId?: string
  ) => Promise<ApiResponse<RemoveCartResponse>>;

  guestCart: GuestCart;
  AddLikeProduct: (
    Product: product,
    variantSizeId?: string | null
  ) => Promise<void>;
  RemoveLikeProduct: (
    ProductId: string
  ) => Promise<ApiResponse<RemoveCartResponse>>;
  LikeProductList: (userid: string) => Promise<ApiResponse<LikeProductType[]>>;
  CartProductList: (userid: string) => Promise<ApiResponse<CartItem[]>>;
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
  setUser: React.Dispatch<React.SetStateAction<User>>;
  triggerRefresh: () => void;
  refreshKey: number;

  UserTrigger: () => void;
  UserRefreshKey: number;
};

const SearchPanelContext = createContext<PanelContextType | null>(null);

export const UsePanel = (): PanelContextType => {
  const context = useContext(SearchPanelContext);
  if (!context) {
    throw new Error("UsePanel must be used within SearchPanelContextProvider");
    console.warn("UsePanel used outside provider");
    // return {
    //   GuestUserDataLength: { Cart: 0, Like: 0 },
    //   LikeProductList: async () => ({ data: [] }),
    //   CartProductList: async () => ({ data: [] }),
    //   AddCartProduct: async () => undefined,
    //   AddLikeProduct: async () => undefined,
    //   AddCartProductGuest: async () => undefined,
    //   incrementCartProduct: async () => {},
    //   decrementCartProduct: async () => {},
    //   setCartProductQty: async () => {},
    //   RemoveCartProduct: async () => {},
    //   RemoveLikeProduct: async () => {},
    //   guestCart: { items: {}, likeProduct: {} },
    // };
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
  const [user, setUser] = useState<User>();

  const [userCountData, setUserCountData] = useState<CountStateType>({
    LikeCount: 0,
    CartCount: 0,
  });

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [UserRefreshKey, setUserRefreshKey] = useState<number>(0);

  // 1️⃣ Mark client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2️⃣ Read localStorage AFTER mount
  useEffect(() => {
    if (!mounted) return;
    const userData = getUserFromStorage();

    const LoadCountData = async () => {
      if (userData) {
        setUser(userData);

        const [Like, Cart]: [
          PromiseSettledResult<ApiResponse<LikeProductType[]>>,
          PromiseSettledResult<ApiResponse<CartItem[]>>
        ] = await Promise.allSettled([
          callApi("get", `/like-products/${userData.id}`),
          callApi("get", `/cart/${userData.id}`),
        ]);

        const likeCount =
          Like.status === "fulfilled" && Like.value?.success
            ? Like.value.data?.length ?? 0
            : 0;

        const cartCount: number =
          Cart.status === "fulfilled" && Cart.value?.success
            ? Cart.value.data?.length ?? 0
            : 0;

        setUserCountData((prev) => ({
          ...prev,
          LikeCount: likeCount,
          CartCount: cartCount,
        }));
      } else {
        const cart = getGuestCart();

        setGuestCart((prev: any) => ({
          ...prev,
          items: cart.items,
          likeProduct: cart.likeProduct,
        }));
      }
    };

    LoadCountData();
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

  //Cart Functions
  const AddCartProduct = async (
    ProductId: string,
    variantSizeId: string | null | undefined,
    size?: string | null
  ): Promise<ApiResponse<AddCartProductResponse> | undefined> => {
    if (user) {
      try {
        let response = await callApi("post", "/cart", {
          data: {
            productId: ProductId,
            userId: user?.id,
            variantSizeId: variantSizeId ?? null,
          },
        });
        return response;
      } catch (err) {
        let message = err?.response?.data?.message || "Something is wrong";
        console.log(err);
        return undefined;
      }
    }
  };

  const AddCartProductGuest = async (
    Product: GuestCartItem,
    variantSizeId?: string | null | undefined,
    size?: string | null
  ) => {
    let added = false;
    let exist = false;
    setGuestCart((prev) => {
      if (!prev) return prev;

      // prevent duplicate
      if (prev.items[Product.id]) {
        exist = true;
        return prev;
      }

      added = true;
      return {
        ...prev,
        items: {
          ...prev.items,
          [Product.id]: {
            ...Product,
            quantity: 1,
            variantSizeId: variantSizeId,
            size: size,
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

  const RemoveCartProduct = async (
    ProductId: string,
    VariantId?: string
  ): Promise<ApiResponse<RemoveCartResponse>> => {
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
      return {
        success: true,
        data: null,
      };
    } else {
      let url;

      if (VariantId) {
        url = `/cart/${user?.id}/${ProductId}?variantSizeId=${VariantId}`;
      } else {
        url = `/cart/${user?.id}/${ProductId}`;
      }
      let res: ApiResponse<RemoveCartResponse> = await callApi("delete", url);
      return res;
    }
  };

  //Like Functions
  const AddLikeProduct = async (
    Product: product,
    variantSizeId?: string | null
  ): Promise<void> => {
    if (user == null || !user) {
      let shouldNotify = false;
      setGuestCart((prev) => {
        if (prev.likeProduct[Product.id]) return prev;

        shouldNotify = true;
        return {
          ...prev,
          likeProduct: {
            ...prev.likeProduct,
            [Product.id]: {
              ...Product,
              variantSizeId,
            },
          },
        };
      });

      if (shouldNotify) {
        toastActions.addToWishlist(`${Product.name}`);
      }

      return;
    } else {
      if (user) {
        let response = await callApi("post", "/like-product", {
          data: {
            productId: Product.id,
            userId: user?.id,
          },
        });

        return response;
      }
    }
  };

  const RemoveLikeProduct = async (
    ProductId: string
  ): Promise<ApiResponse<RemoveCartResponse>> => {
    if (user == null || !user) {
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
    } else {
      let response: ApiResponse<RemoveCartResponse> = await callApi(
        "delete",
        `/like-product/${id}/${ProductId}`
      );

      return response;
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

  const LikeProductList = async (
    userid: string
  ): Promise<ApiResponse<LikeProductType[]>> => {
    return await callApi("get", `/like-products/${userid}`);
  };

  const CartProductList = async (
    userid: string
  ): Promise<ApiResponse<CartItem[]>> => {
    return await callApi("get", `/cart/${userid}`);
  };

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const UserTrigger = () => {
    setUserRefreshKey((prev) => prev + 1);
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
        AddCartProductGuest,
        isOpen,
        loading,
        onOpen,
        onOpenChange,
        userCountData,
        setUserCountData,
        setUser,
        triggerRefresh,
        refreshKey,
        UserTrigger,
        UserRefreshKey,
      }}
    >
      {children}
    </SearchPanelContext.Provider>
  );
}
