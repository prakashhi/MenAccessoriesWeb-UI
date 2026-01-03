import { LikeProductType } from "./LikeType";
import { CartItem } from "./CartType";

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
