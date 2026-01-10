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


export 
