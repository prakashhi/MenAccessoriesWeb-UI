import { ProductInfoType } from "./ProductType";
import { likeProductType } from "./LikeType";

export type GuestLikeItem = ProductInfoType & {
  variantSizeId: string | null;
};

export type GuestCartItem = ProductInfoType & {
  quantity?: number;
  variantSizeId?: string | null;
  size?: string | null;
  VariantStock?: number;
};

export type GuestCart = {
  items: Record<string, GuestCartItem>;
  likeProduct: Record<string, likeProductType>;
};

export type product = {
  code: string;
  id: string;
  image: string;
  name: string;
  sellingPrice: number;
  seqId: number;
  stock: number;
  variantId?: string | null;
};

export type Like = {
  code: string;
  id: string;
  image: string;
  name: string;
  sellingPrice: number;
  seqId: number;
  stock: number;
};
