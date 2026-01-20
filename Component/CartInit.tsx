"use client"
import { useGuestUser } from "@/context/GuestUserContext";

import { useEffect } from "react";

export function CartInit() {
  const { guestCart, GuestCartProductStockCheck } = useGuestUser();

  useEffect(() => {
    if (guestCart) {
      GuestCartProductStockCheck(guestCart);
    }
  }, []);
  return null;
}
