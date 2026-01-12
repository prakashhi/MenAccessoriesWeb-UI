"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";

import { UserAddressListType } from "@/Type/UserDetailType";
import { getUserFromStorage } from "./utils";
import { useApi } from "@/app/useApi";
import {
  ApiResponse,
  APiNoDataREsponse,
  accountInfoStateType,
  materialListResponse,
} from "@/Type/Types";
import { LikeProductType } from "@/Type/LikeType";
import { CartItem } from "@/Type/CartType";

import type {
  CountStateType,
  menProductListType,
  menProductFilter,
  MenSubCategoryResponse,
  materialListParams,
  CateLogResponse,
  MenCategoryMartialState,
  SaleResponseType,
  loginModelType,
} from "@/Type/Types";
import {
  UserGetDetailType,
  OrderDetailType,
  EditUserObjType,
  CreateAddressPostObjType,
  createSaleConfigType,
} from "@/Type/UserDetailType";

import { generateOrderId } from "./utils";

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

  MenCategoryList: (
    filterOption: menProductFilter
  ) => Promise<ApiResponse<menProductListType>>;

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
  menProductFilter: menProductFilter;
  MenAllSubCategoryList: () => Promise<ApiResponse<MenSubCategoryResponse[]>>;
  MaterialAllList: (
    Params?: materialListParams
  ) => Promise<ApiResponse<materialListResponse[]>>;

  CateLogProducts: () => Promise<ApiResponse<CateLogResponse[]>>;
  setMenProductFilter: React.Dispatch<React.SetStateAction<menProductFilter>>;
  CateMateListState: MenCategoryMartialState;
  createSalesFunction: (
    CreateSaleConfig: createSaleConfigType
  ) => Promise<ApiResponse<SaleResponseType>>;

  loginModel: loginModelType;

  setLoginModel: React.Dispatch<React.SetStateAction<loginModelType>>;
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

  const [loginModel, setLoginModel] = useState<loginModelType>({
    LoginModel: false,
    OTPFillModel: false,
    UserCreateModel: false,
  });

  const [menProductFilter, setMenProductFilter] = useState<menProductFilter>({
    categoryIds: [],
  });

  const [userDataContext, setUserDataContext] = useState<accountInfoStateType>({
    info: null,
    OrderList: [],
    AddressList: [],
  });
  const [CateMateListState, setCateMateLisState] =
    useState<MenCategoryMartialState>({
      Material: [],
      MenCategory: [],
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
  const CateLogProducts = async (): Promise<ApiResponse<CateLogResponse[]>> => {
    try {
      return await callApi("get", `/rockroar/catalog`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const MenCategoryList = async (
    filterOption: menProductFilter
  ): Promise<ApiResponse<menProductListType>> => {
    try {
      return await callApi("get", `/9rock/get-products`, {
        params: filterOption,
      });
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const MenAllSubCategoryList = async (): Promise<
    ApiResponse<MenSubCategoryResponse[]>
  > => {
    let menCategoryId = "3e1ae7d6-97aa-4068-9fbe-7c64b73525c1";
    try {
      return await callApi("get", `/9rock/get-sub-categories/${menCategoryId}`);
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

  const MaterialAllList = async (
    Params?: materialListParams
  ): Promise<ApiResponse<materialListResponse[]>> => {
    try {
      return await callApi("get", `/material-list`, { params: Params });
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Something is wrong",
        status: error?.response?.status,
      };
    }
  };

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

  // sales Function

  const createSalesFunction = async (
    CreateSaleConfig: createSaleConfigType
  ): Promise<ApiResponse<SaleResponseType>> => {
    try {
      let date = new Date().toISOString();

      let salesConfig = {
        sales: {
          salesDate: date,
          invoiceId: generateOrderId("INVOICE"),
          orderId: generateOrderId("ORD"),
          totalPrice: Math.ceil(CreateSaleConfig.TotalAmount),
          totalQuantity: CreateSaleConfig.TotalProductQty,
          totalDiscount: 0,
          totalTax: CreateSaleConfig.TotalTax,
          shippingFee: CreateSaleConfig.shippingFee,
          salesStatus: "PENDING",
          source: "ROCKROAR",
        },
        products: CreateSaleConfig.OrderProductList,
        payments: {
          transactionId: generateOrderId("TRAN"),
          paymentMethod: "RAZORPAY",
          paymentStatus: "PAID",
          paymentAmount: Math.ceil(CreateSaleConfig.TotalAmount),
          razorpayOrderId: CreateSaleConfig.razorpayOrderId,
          razorpayPaymentId: CreateSaleConfig.razorpayPaymentId,
          razorpaySignature: CreateSaleConfig.razorpaySignature,
          paymentDate: date,
        },
        customer: {
          customerType: "RETAIL_CUSTOMER",
          customerName: CreateSaleConfig.customerName,
          customerEmail: CreateSaleConfig.customerEmail,
          customerPhone: CreateSaleConfig.customerPhone,
          customerAddress: CreateSaleConfig.customerAddress,
          customerState: CreateSaleConfig.customerState,
          customerPinCode: CreateSaleConfig.customerPinCode,
          customerCountry: CreateSaleConfig.customerCountry,
          customerCountryCode: CreateSaleConfig.customerCountryCode,
          // customerId: CreateSaleConfig.customerId,
          nineRockUserId: CreateSaleConfig.customerId,
          customerGSTIN: null,
          customerGSTAddress: null,
        },
        shouldSendEmail: true,
        shouldMinimizeStock: true,
      };

      console.log("salesConfig", salesConfig);

      return await callApi("post", "/sales", { data: salesConfig });
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

    const RequireListDataGet = async () => {
      try {
        const [CategoryList, MaterialList] = await Promise.allSettled([
          MenAllSubCategoryList(),
          MaterialAllList(),
        ]);

        const category =
          CategoryList.status == "fulfilled"
            ? CategoryList.value.data ?? []
            : [];
        const material =
          MaterialList.status == "fulfilled"
            ? MaterialList.value.data ?? []
            : [];

        setCateMateLisState({
          MenCategory: category,
          Material: material,
        });
      } catch (err) {
        console.log(err);
      }
    };

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
    RequireListDataGet();
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
        MenCategoryList,

        CateLogProducts,

        menProductFilter,
        setMenProductFilter,
        MenAllSubCategoryList,
        MaterialAllList,
        CateMateListState,
        createSalesFunction,

        loginModel,
        setLoginModel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
