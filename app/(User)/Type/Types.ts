export interface SizeVariant {
  id: string;
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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  variantId: string | null;
  isHaveSizeVariants: boolean;
  sizeVariants: SizeVariant[];
}

export type productCategoryList = {
  createdAt: string;
  id: string;
  image: string;
  name: string;
  noOfProducts: number;

  products: ProductInfoType[];
};

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

export interface User {
  id: string;

  userName: string;
  email: string;
  role: "user" | "admin" | "supplier";

  isSupplier: boolean;

  contactNumber: string;
  country: string;
  countryCode: string;
  countryCodeLabel: string;
  state: string;
  address: string;
  pinCode: string;

  profilePicture: string;

  firmName: string | null;
  firmAddress: string | null;
  GSTIN: string | null;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
}

export type OrderType = {
  id: string;
  item: string;
  status: string;
  date?: string;
};

export type LikeProductType = {
  likeId: string;
  product: ProductInfoType;
};

export type RegisterType = {
  userName: string;

  email: string;

  password: string;

  address: string | null;

  pinCode: string | null;

  contactNumber: string | null;

  countryCode: string | null;

  countryCodeLabel: string | null;

  isSupplier: string | null;

  country: string | null;

  state: string | null;
  confirmPassword: string | null;
};

export type Data = {
  CartData: Record<string, CartItem>;
  LikeData: Record<string, LikeProductType>;
};

export type variantDataProduct = {
  canBeMade: number;
  code: string;
  id: string;
  image: string;
  isActive: boolean;
  name: string;
  seqId: string;
  stock: number;
};

export type productSize = {
  id: string;
  size: string;
  stock: number;
};

export type GuestLikeItem = ProductInfoType & {
  variantSizeId: string | null;
};

export type UserLikeItem = LikeProductType;
