"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { getUserFromStorage } from "./utils";
import { useApi } from "@/app/useApi";
import { ApiResponse, APiNoDataREsponse } from "@/Type/Types";

import { AddCartProductResponse, RemoveCartResponse } from "@/Type/CartType";

import { CartItem } from "@/Type/CartType";
import { UsePanel } from "./Context";
import { UserGetDetailType } from "@/Type/UserDetailType";

export type UserCartContextType = {
  CartProductList: (userid: string) => Promise<ApiResponse<CartItem[]>>;
  AddCartProduct: (
    ProductId: string,
    variantSizeId: string | null | undefined
  ) => Promise<ApiResponse<AddCartProductResponse>>;

  RemoveCartProduct: (
    ProductId: string,
    VariantId?: string
  ) => Promise<ApiResponse<RemoveCartResponse>>;

  incrementCartProduct: (
    cardId: string,
    quantity: number
  ) => Promise<ApiResponse<APiNoDataREsponse>>;

  decrementCartProduct: (
    cardId: string,
    quantity: number
  ) => Promise<ApiResponse<APiNoDataREsponse>>;
};

const UserCartContext = createContext<UserCartContextType | null>(null);

export const useUserCart = (): UserCartContextType => {
  const context = useContext(UserCartContext);
  if (!context) {
    throw new Error("UsePanel must be used within SearchPanelContextProvider");
  }
  return context;
};

export function UserCartContextProvider({ children }: { children: ReactNode }) {
  const { user } = UsePanel();
  const { callApi } = useApi();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  // 2️⃣ Read localStorage AFTER mount
  // useEffect(() => {
  //   if (!mounted) return;
  //   const userData = getUserFromStorage();
  //   const LoadData = async () => {
  //     if (userData) {
  //       setUser(userData);
  //     }
  //   };
  //   LoadData();
  // }, [mounted]);

  const AddCartProduct = async (
    ProductId: string,
    variantSizeId: string | null | undefined
  ): Promise<ApiResponse<AddCartProductResponse>> => {
    try {
      return await callApi("post", "/9rock/cart", {
        data: {
          productId: ProductId,
          nineRockUserId: user?.id,
          variantSizeId: variantSizeId ?? null,
        },
      });
    } catch (error: any) {
      console.log(error, "error");
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const RemoveCartProduct = async (
    ProductId: string,
    VariantId?: string
  ): Promise<ApiResponse<RemoveCartResponse>> => {
    let url;

    if (VariantId) {
      url = `/9rock/cart/${user?.id}/${ProductId}?variantSizeId=${VariantId}`;
    } else {
      url = `/9rock/cart/${user?.id}/${ProductId}`;
    }

    try {
      return await callApi("delete", url);
    } catch (error: any) {
      console.log(error, "error");
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const CartProductList = async (
    userid: string
  ): Promise<ApiResponse<CartItem[]>> => {
    try {
      return await callApi("get", `/9rock/cart/${userid}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Failed to add like",
        status: error?.response?.status,
      };
    }
  };

  const incrementCartProduct = async (
    cardId: string,
    quantity: number
  ): Promise<ApiResponse<APiNoDataREsponse>> => {
    try {
      return await callApi("patch", `/9rock/cart/${cardId}`, {
        data: { quantity: quantity },
      });
    } catch (error: any) {
      console.log(error, "error");
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const decrementCartProduct = async (
    cardId: string,
    quantity: number
  ): Promise<ApiResponse<APiNoDataREsponse>> => {
    try {
      return await callApi("patch", `/9rock/cart/${cardId}`, {
        data: { quantity: quantity },
      });
    } catch (error: any) {
      console.log(error, "error");
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  return (
    <UserCartContext.Provider
      value={{
        CartProductList,
        AddCartProduct,
        RemoveCartProduct,
        incrementCartProduct,
        decrementCartProduct,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
}
