"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";

import { User } from "@/Type/UserDetailType";
import { getGuestCart, getUserFromStorage } from "./utils";
import { useApi } from "@/app/useApi";
import { ProductInfoType } from "@/Type/ProductType";
import { ApiResponse, APiNoDataREsponse } from "@/Type/Types";
import { AddLikeResponse } from "@/Type/LikeType";

import { LikeProductType } from "@/Type/LikeType";
import { CartItem } from "@/Type/CartType";

import { CountStateType } from "@/Type/Types";
import {
  UserGetDetailType,
  OrderDetailType,
  EditUserObjType,
} from "@/Type/UserDetailType";

export type UserContextType = {
  userCountData: CountStateType;

  setUserCountData: React.Dispatch<React.SetStateAction<CountStateType>>;
  UserTrigger: () => void;
  UserRefreshKey: number;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  triggerRefresh: () => void;
  loading: boolean;
  refreshKey: number;

  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  GetUserData: (userid: string) => Promise<ApiResponse<UserGetDetailType>>;
  GetUserOrderList: (userId: string) => Promise<ApiResponse<OrderDetailType>>;
  GetAllUserAddress: (
    userid: string
  ) => Promise<ApiResponse<APiNoDataREsponse>>;

  EditUserDetail: (
    userid: string,
    editDataObj: EditUserObjType
  ) => Promise<ApiResponse<APiNoDataREsponse>>;
};

import { useDisclosure } from "@heroui/react";

const UserContext = createContext<UserContextType | null>(null);

export const UsePanel = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UsePanel must be used within SearchPanelContextProvider");
  }
  return context;
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { callApi, loading } = useApi();
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [UserRefreshKey, setUserRefreshKey] = useState<number>(0);

  const [userCountData, setUserCountData] = useState<CountStateType>({
    LikeCount: 0,
    CartCount: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
          callApi("get", `/9rock/likes/${userData.id}`),
          callApi("get", `/9rock/cart/${userData.id}`),
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
      }
    };

    LoadCountData();
  }, [mounted]);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const UserTrigger = () => {
    setUserRefreshKey((prev) => prev + 1);
  };

  const GetUserData = async (
    userid: string
  ): Promise<ApiResponse<UserGetDetailType>> => {
    try {
      return await callApi("get", `/9rock/users/${userid}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const GetUserOrderList = async (
    userId: string
  ): Promise<ApiResponse<OrderDetailType>> => {
    try {
      return callApi("get", `/sales/customer/${userId}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const GetAllUserAddress = async (
    userid: string
  ): Promise<ApiResponse<APiNoDataREsponse>> => {
    try {
      return await callApi("get", `/9rock/users/${userid}/addresses`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const EditUserDetail = async (
    userid: string,
    editDataObj: EditUserObjType
  ): Promise<ApiResponse<APiNoDataREsponse>> => {
    try {
      return await callApi("put", `/9rock/users/${userid}`, {
        data: editDataObj,
      });
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  return (
    <UserContext.Provider
      value={{
        setUserCountData,
        triggerRefresh,
        UserTrigger,
        setUser,
        onOpen,
        isOpen,
        loading,
        onOpenChange,
        refreshKey,
        UserRefreshKey,
        userCountData,

        GetUserData,
        GetUserOrderList,
        GetAllUserAddress,
        EditUserDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
