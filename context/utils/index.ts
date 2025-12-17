import { product } from "../Types/type";

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

type GuestCart = {
  items: Record<string, CartItem>;
};

export function getUserFromStorage() {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("UserData");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function getGuestCart(): GuestCart {
  if (typeof window === "undefined") {
    return { items: {} };
  }

  const raw = localStorage.getItem("GuestUserData");

  if (!raw) {
    return { items: {} };
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed?.items ? parsed : { items: {} };
  } catch (error) {
    console.error("Invalid GuestUserData in localStorage", error);
    return { items: {} };
  }
}

export function updateGuestCart(newCart: CartItem[]) {
  localStorage.setItem("GuestUserData", JSON.stringify(newCart));
}

export function saveGuestCart(cart: GuestCart) {
  localStorage.setItem("GuestUserData", JSON.stringify(cart));
}
