"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";

import {
  OrderProductLisType,
  User,
  UserAddressListType,
} from "@/Type/UserDetailType";
import { getGuestCart, getUserFromStorage } from "./utils";
import { useApi } from "@/app/useApi";
import { ProductInfoType } from "@/Type/ProductType";
import {
  ApiResponse,
  APiNoDataREsponse,
  accountInfoStateType,
} from "@/Type/Types";
import { AddLikeResponse } from "@/Type/LikeType";

import { LikeProductType } from "@/Type/LikeType";
import { CartItem } from "@/Type/CartType";

import { CountStateType } from "@/Type/Types";
import {
  UserGetDetailType,
  OrderDetailType,
  EditUserObjType,
  CreateAddressPostObjType,
} from "@/Type/UserDetailType";

export type UserContextType = {
  userCountData: CountStateType;

  setUserCountData: React.Dispatch<React.SetStateAction<CountStateType>>;
  UserTrigger: () => void;
  UserRefreshKey: number;

  setUser: React.Dispatch<React.SetStateAction<UserGetDetailType | null>>;
  triggerRefresh: () => void;
  loading: boolean;
  refreshKey: number;

  user: UserGetDetailType | null;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  GetUserData: (userid: string) => Promise<ApiResponse<UserGetDetailType>>;
  GetUserOrderList: (userId: string) => Promise<ApiResponse<OrderDetailType[]>>;
  GetAllUserAddress: (
    userid: string
  ) => Promise<ApiResponse<UserAddressListType[]>>;

  CreateUser: (
    userDataObj: EditUserObjType
  ) => Promise<ApiResponse<UserGetDetailType>>;

  EditUserDetail: (
    userid: string,
    editDataObj: EditUserObjType
  ) => Promise<ApiResponse<APiNoDataREsponse>>;

  CreateUserAddress: (
    DataObj: CreateAddressPostObjType,
    userid: string
  ) => Promise<ApiResponse<UserAddressListType>>;

  EditUserAddress: (
    addressId: string,
    EditAddressObj: CreateAddressPostObjType
  ) => Promise<ApiResponse<APiNoDataREsponse>>;

  DeleteAddressProfile: (
    addressId: string
  ) => Promise<ApiResponse<APiNoDataREsponse>>;

  userDataContext: accountInfoStateType;
  setUserDataContext: React.Dispatch<
    React.SetStateAction<accountInfoStateType>
  >;
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
  const userData = getUserFromStorage();
  const { callApi, loading } = useApi();
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<UserGetDetailType | null>(null);

  const [userDataContext, setUserDataContext] = useState<accountInfoStateType>({
    info: null,
    OrderList: [],
    AddressList: [],
  });

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [UserRefreshKey, setUserRefreshKey] = useState<number>(0);

  const [userCountData, setUserCountData] = useState<CountStateType>({
    LikeCount: 0,
    CartCount: 0,
  });

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const UserTrigger = () => {
    setUserRefreshKey((prev) => prev + 1);
  };

  //User Functions

  const CreateUser = async (
    userDataObj: EditUserObjType
  ): Promise<ApiResponse<UserGetDetailType>> => {
    try {
      return await callApi("post", `/9rock/users/create-user`, {
        data: userDataObj,
      });
    } catch (error: any) {
      console.log(error);
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
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

  const GetUserOrderList = async (
    userId: string
  ): Promise<ApiResponse<OrderDetailType[]>> => {
    try {
      return await callApi("get", `/sales/customer/${userId}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  //ProductRelated Function
  const catalogProducts = async () => {
    try {
      return await callApi("get", `/rockroar/catalog`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  // const MenCategoryList = () =>
  // {
  //   try{

  //   }
  // }

  //Address Functions
  const GetAllUserAddress = async (
    userid: string
  ): Promise<ApiResponse<UserAddressListType[]>> => {
    try {
      return await callApi("get", `/9rock/users/${userid}/addresses`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const CreateUserAddress = async (
    DataObj: CreateAddressPostObjType,
    userid: string
  ): Promise<ApiResponse<UserAddressListType>> => {
    try {
      return await callApi("post", `/9rock/users/address`, {
        data: { ninerockUserId: userid, ...DataObj },
      });
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const EditUserAddress = async (
    addressId: string,
    EditAddressObj: CreateAddressPostObjType
  ): Promise<ApiResponse<APiNoDataREsponse>> => {
    try {
      return await callApi("put", `/9rock/users/address/${addressId}`, {
        data: EditAddressObj,
      });
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const DeleteAddressProfile = async (
    addressId: string
  ): Promise<ApiResponse<APiNoDataREsponse>> => {
    try {
      return await callApi("delete", `/9rock/users/address/${addressId}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const userData = getUserFromStorage();

    

    setUser(userData);

    const LoadCountData = async () => {
      if (user?.id) {
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
  }, [mounted, user?.id, refreshKey]);

  useEffect(() => {
    const UserDetailsGlobalFunction = async (userId: string) => {
      try {
        let [profileData, OrderList, address] = await Promise.all([
          GetUserData(userId),
          GetUserOrderList(userId),
          GetAllUserAddress(userId),
        ]);

        if (!mounted) return;

        let ProfileData =
          profileData.success && profileData.data ? profileData.data : null;
        let OrderData =
          OrderList.success && OrderList.data ? OrderList.data : [];
        let AddressData = address.success && address.data ? address.data : [];

        setUserDataContext({
          info: ProfileData,
          OrderList: OrderData,
          AddressList: AddressData,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (userData) {
      UserDetailsGlobalFunction(userData.id);
    }
  }, [mounted, refreshKey, UserRefreshKey, user?.id]);

  return (
    <UserContext.Provider
      value={{
        setUserCountData,
        triggerRefresh,
        UserTrigger,
        setUser,
        user,
        onOpen,
        isOpen,
        loading,
        onOpenChange,
        refreshKey,
        UserRefreshKey,
        userCountData,

        CreateUser,
        GetUserData,
        GetUserOrderList,
        GetAllUserAddress,
        EditUserDetail,

        CreateUserAddress,
        EditUserAddress,
        DeleteAddressProfile,

        userDataContext,
        setUserDataContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
