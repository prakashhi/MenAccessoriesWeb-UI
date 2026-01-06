import { LikeProductType } from "./LikeType";
import { CartItem } from "./CartType";

import { UserGetDetailType, UserAddressListType } from "./UserDetailType";
import { OrderProductLisType, OrderDetailType } from "./UserDetailType";

export type Data = {
  CartData: Record<string, CartItem>;
  LikeData: Record<string, LikeProductType>;
};

export type UserLikeItem = LikeProductType;

// API Type
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T | null;
};

export type APiNoDataREsponse = {
  success?: boolean;
  message?: string;
};

export type PromiseSettledResult<T> =
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: any };

export type CountStateType = {
  LikeCount: number;
  CartCount: number;
};

export type accountInfoStateType = {
  info: UserGetDetailType | null;
  OrderList: OrderDetailType[];
  AddressList: UserAddressListType[];
};
