export type OrderProductLisType = {
  id: string;
  salesId: string;
  productId: string;
  productName: string;
  productCategory: string;
  productSerialNumber: string;
  productImage: string;
  productHSNCode: string;
  quantity: number;
  weight: string | null;
  price: number;
  variantSize: string | null;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

export type OrderType = {
  id: string;
  item: string;
  status: string;
  date?: string;
};

export type paymentSectionType = {
  id: string;
  transactionId: string;
  salesId: string;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentAmount: number;
  createdAt: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type OrderDetailType = {
  id: string;
  customerType: string;
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
  customerId: string;
  customerGSTIN: string | null;
  address: string | null;
  contactNumber: string | null;
  countryCode: string | null;
  country: string | null;
  state: string | null;
  invoiceId: string;
  orderId: string;
  salesDate: string;
  salesStatus: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  products: OrderProductLisType[];
  payments: paymentSectionType[];
  paymentSummary: {
    totalPaid: number;
    balanceDue: number;
    recordedPayments: number;
    lastPaidAt: string | null;
  };
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

export type UserGetDetailType = {
  id: string;
  userFirstName: string;
  userLastName: string;
  jwtToken?: string;
  contactNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type EditUserObjType = {
  userFirstName: string;
  userLastName: string;
  contactNumber: string;
  email: string;
};

export type UserAddressListType = {
  id: string;
  ninerockUserId: string;
  idkUserId: string | null;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  countryCode: string;
  contactNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CreateAddressPostObjType = {
  ninerockUserId?: string;
  idkUserId?: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  countryCode: string;
  contactNumber: string;
  email: string;
};

export type CreateSaleProductListType = {
  productId: string;
  productName: string;
  productCategory: string;
  productSerialNumber: string;
  productImage: string;
  productHSNCode?: string | null;
  quantity: number;
  price: number;
  totalPrice: number;
  variantSize: string | null;
};

export type createSaleConfigType = {
  TotalAmount: number;
  // SubTotalAmount: number;
  TotalProductQty: number;
  TotalTax: number;
  shippingFee: number;
  OrderProductList: CreateSaleProductListType[];
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;

  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerState: string;
  customerPinCode: string;
  customerCountry: string;
  customerCountryCode: string;
  customerId: string | null;
};
