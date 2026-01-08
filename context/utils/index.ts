import { getAuthData } from "@/utils/localStorageUtil";
import { GuestCart } from "@/Type/GuestType";
import { jwtDecode } from "jwt-decode";

type CartItem = {
  code: string;
  id: string;
  image: string;
  name: string;
  sellingPrice: number;
  seqId: number;
  stock: number;
  quantity: number;
};

// type GuestCart = {
//   items: Record<string, CartItem>;
//   likeProduct: Record<string, CartItem>;
// };

export type DecodedJwt = {
  id?: string;
  email?: string;
  userFirstName?: string;
  userLastName?: string;
  iat?: number;
};

export function decodeJwtToken(token: string): DecodedJwt | null {
  try {
    return jwtDecode<DecodedJwt>(token);
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null;
  }
}

export function getUserFromStorage() {
  if (typeof window === "undefined") return null;

  try {
    const data = getAuthData("UserData");

    const getToken = getAuthData("Token");

    let tokenData = getToken && decodeJwtToken(getToken);

    return data ? JSON.parse(data) : tokenData;
  } catch {
    return null;
  }
}

export function getGuestCart(): GuestCart {
  if (typeof window === "undefined") {
    return { items: {}, likeProduct: {} };
  }

  const raw = localStorage.getItem("GuestUserData");

  if (!raw) {
    return { items: {}, likeProduct: {} };
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      items: parsed?.items ?? {},
      likeProduct: parsed?.likeProduct ?? {},
    };
  } catch (error) {
    console.error("Invalid GuestUserData in localStorage", error);
    return { items: {}, likeProduct: {} };
  }
}

export function updateGuestCart(newCart: CartItem[]) {
  localStorage.setItem("GuestUserData", JSON.stringify(newCart));
}

export function saveGuestCart(cart: GuestCart) {
  localStorage.setItem("GuestUserData", JSON.stringify(cart));
}
