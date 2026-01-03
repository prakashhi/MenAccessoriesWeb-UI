export interface CartProductInfo {
  productName: string;
  productImage: string;
  productPrice: string;
  productId: string;
  serialNumber: string;
  materialUsedName: string;
  stock: number;
  canBeMade: number;
  categoryName: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProductInfo;
  variantSize: VariantSize;
}

export interface VariantSize {
  variantSizeId: string;
  variantSizeName: string;
  variantSizeStock: number;
}
export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  image: string; // empty string allowed
  parentCategoryId: string | null;
  parentId: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProductInfo;
  variantSize: VariantSize;
}

export type CartRemoveResponseType = {
  id: string;
  success: boolean;
  message: string;
};

export type RemoveCartResponse = {
  id: string;
  success: true;
  message: string;
};
export interface AddCartProductResponse {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  variantSizeId: string;
  createdAt: string;
  updatedAt: string;
}
