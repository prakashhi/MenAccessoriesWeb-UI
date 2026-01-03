"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { User } from "@/Type/UserDetailType";
import { getUserFromStorage } from "./utils";
import { useApi } from "@/app/useApi";
import { ProductInfoType } from "@/Type/ProductType";
import { ApiResponse, APiNoDataREsponse } from "@/Type/Types";
import { AddLikeResponse } from "@/Type/LikeType";

import { LikeProductType } from "@/Type/LikeType";

export type UserLikeContextType = {
  AddLikeProduct: (
    Product: ProductInfoType,
    variantSizeId?: string | null
  ) => Promise<ApiResponse<AddLikeResponse>>;

  RemoveLikeProduct: (userid: string) => Promise<APiNoDataREsponse>;

  LikeProductList: (userid: string) => Promise<ApiResponse<LikeProductType[]>>;
};

const UserLikeContext = createContext<UserLikeContextType | null>(null);

export const useUserLike = (): UserLikeContextType => {
  const context = useContext(UserLikeContext);
  if (!context) {
    throw new Error("UsePanel must be used within SearchPanelContextProvider");
  }
  return context;
};

export function UserLikeContextProvider({ children }: { children: ReactNode }) {
  const { callApi } = useApi();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 2️⃣ Read localStorage AFTER mount
  useEffect(() => {
    if (!mounted) return;
    const userData = getUserFromStorage();

    const LoadData = async () => {
      if (userData) {
        setUser(userData);
      }
    };
    LoadData();
  }, [mounted]);

  const AddLikeProduct = async (
    Product: ProductInfoType,
    variantSizeId?: string | null
  ): Promise<ApiResponse<AddLikeResponse>> => {
    let response = await callApi("post", "/9rock/likes", {
      data: {
        productId: Product.id,
        userId: process.env.NEXT_PUBLIC_USER_ID,
        //userId: user?.id,
      },
    });

    return response;
  };

  const RemoveLikeProduct = async (
    ProductId: string
  ): Promise<APiNoDataREsponse> => {
    let response: ApiResponse<APiNoDataREsponse> = await callApi(
      "delete",
      `/9rock/likes/${process.env.NEXT_PUBLIC_USER_ID}/${ProductId}`
    );

    return response;
  };

  const LikeProductList = async (
    userid: string
  ): Promise<ApiResponse<LikeProductType[]>> => {
    return await callApi("get", `/like-products/${userid}`);
  };

  return (
    <UserLikeContext.Provider
      value={{
        AddLikeProduct,
        RemoveLikeProduct,
        LikeProductList,
      }}
    >
      {children}
    </UserLikeContext.Provider>
  );
}
