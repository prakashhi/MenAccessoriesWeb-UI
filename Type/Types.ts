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

export type SizeMen = {
  id: string;
  size: string;
  stock: number;
};

export type menProductData = {
  id: string;
  name: string;
  image: string;
  code: string;
  sellingPrice: number;
  categoryName: string;
  stock: number;
  sizes: SizeMen[];
};

export type menProductListType = {
  total: number;
  data: menProductData[];
};

export type menProductiveArraysObj = {
  minPrice: 0;
  maxPrice: 0;
};

export type menProductFilter = {
  keyword?: string;
  categoryIds?: string[];
  materialIds?: string[];
  priceArrays?: menProductiveArraysObj[];
  sortOrder?: "asc" | "desc";
  showInStockProducts?: true | false;
  sortBy?: "createdAt" | "price" | "alphabetical";
  minPrice?: number;
  maxPrice: number;
  limit?: number;
  offset?: number;
  priceLabel?: string;
};

export type MenSubCategoryResponse = {
  id: string;
  name: string;
  image: string;
};

export type materialListParams = {
  page?: number;
  limit?: number;
};

export type materialListData = {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type materialListResponse = {
  total: number;
  page: number;
  limit: number;
  data: materialListData[];
};

export type CateLogResponseProductType = {
  id: string;
  seqId: number;
  name: string;
  image: string;
  code: string;
  sellingPrice: number;
};

export type CateLogResponse = {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  noOfProducts: number;
  products: CateLogResponseProductType[];
};

export type MenCategoryMartialState = {
  Material: materialListResponse[];
  MenCategory: MenSubCategoryResponse[];
};

export interface SaleProduct {
  id: string;
  salesId: string;
  productId: string;

  productName: string;
  productCategory: string;
  productSerialNumber: string;
  productImage: string;
  productHSNCode: string;

  quantity: number;
  weight: number | null;
  price: number;
  variantSize: string | null;
  totalPrice: number;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Payment {
  id: string;
  transactionId: string;
  salesId: string;

  paymentDate: string; // ISO string
  paymentMethod: string;
  paymentStatus: string;
  paymentAmount: number;

  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SaleResponseType {
  id: string;
  customerType: "RETAIL_CUSTOMER" | "WHOLESALE_CUSTOMER";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerGSTAddress: string | null;
  customerState: string;
  customerPinCode: string;
  customerCountry: string;
  customerCountryCode: string;

  totalPrice: number;
  totalQuantity: number;
  totalDiscount: number;
  totalTax: number;
  shippingFee: number;

  customerId: string | null;

  address: string | null;
  contactNumber: string | null;
  countryCode: string | null;
  country: string | null;
  state: string | null;

  invoiceId: string;
  orderId: string;
  salesDate: string; // ISO string
  salesStatus: string;
  source: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  products: SaleProduct[];
  payments: Payment[];
}

export type loginModelType = {
  LoginModel: boolean;
  OTPFillModel: boolean;
  UserCreateModel: boolean;
};

export type CreateInVoiceConfigType = {
  invoiceId: string;
  userId?: string;
  nineRockUserId: string;
  productIds: string;
  productQuantity: number;
  tax: number;
  shippingFee: number;
  totalPrice: number;
};

export type InvoiceCreateResponse = {
  id: string;
  invoiceId: string;
  userId: string;
  productIds: string;
  productQuantity: number;
  tax: number;
  shippingFee: number;
  totalPrice: number;
  createdAt: string;
};

export type modelTypes = {
  PaymentAddressSelect: boolean;
  PaymentSuccessModel: boolean;
  PaymentFailModel: boolean;
};
