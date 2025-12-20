export interface SizeVariant {
  size: string;
  stock: number;
}
export interface ProductInfoType {
  id: string;
  seqId: number;
  name: string;
  numberOfPieces: number;
  color: string;
  workDays: number;
  sellingPrice: number;
  difference: number;
  isSpecial: boolean;
  serialNumber: string;
  stock: number;
  doublePremium: boolean;
  code: string;
  QRCode: string;
  customPrice: number;
  systemPrice: number;
  size: string;
  weight: string;
  description: string;
  image: string;
  nineRockImage: string | null;
  video: string | null;
  materialUsed: string;
  materialUsedName: string;
  canBeMade: number;
  addedByName: string | null;
  updatedByName: string | null;
  deletedByName: string | null;
  isActive: boolean;
  addedBy: string | null;
  categoryId: string | null;
  categoryName: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  variantId: string | null;
  isHaveSizeVariants: boolean;
  sizeVariants: SizeVariant[];
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


export interface VariantSize {
  variantSizeId: string;
  variantSizeName: string;
  variantSizeStock: number;
}


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

export interface LikeItem {
  likeId: string;
  product: ProductInfoType;
}

