"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { useApi } from "@/app/useApi";
import { ProductInfoType } from "@/Type/ProductType";
import { ApiResponse, APiNoDataREsponse } from "@/Type/Types";
import { AddLikeResponse } from "@/Type/LikeType";

import { LikeProductType } from "@/Type/LikeType";
import { UsePanel } from "./Context";

export type UserLikeContextType = {
  AddLikeProduct: (
    Product: ProductInfoType
  ) => Promise<ApiResponse<AddLikeResponse>>;

  RemoveLikeProduct: (ProductId: string) => Promise<APiNoDataREsponse>;

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
  const { userDataContext, user } = UsePanel();

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

  const AddLikeProduct = async (
    Product: ProductInfoType
  ): Promise<ApiResponse<AddLikeResponse>> => {
    try {
      return await callApi("post", "/9rock/likes", {
        data: {
          productId: Product.id,
          userId: user?.id,
        },
      });
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Failed to add like",
        status: error?.response?.status,
      };
    }
  };

  const RemoveLikeProduct = async (
    ProductId: string
  ): Promise<APiNoDataREsponse> => {
    try {
      return await callApi("delete", `/9rock/likes/${user?.id}/${ProductId}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Failed to remove like",
        status: error?.response?.status,
      };
    }
  };

  const LikeProductList = async (
    userid: string
  ): Promise<ApiResponse<LikeProductType[]>> => {
    try {
      return await callApi("get", `/9rock/likes/${userid}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
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
