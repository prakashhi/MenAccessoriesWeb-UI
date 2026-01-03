import { ProductInfoType } from "./ProductType";

export type LikeProductType = {
  likeId: string;
  product: ProductInfoType;
};
export type likeProductType = ProductInfoType & {
  variantSizeId?: string | null;
};

export type AddLikeResponse = {
  id: string;
  productId: string;
  nineRockUserId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
