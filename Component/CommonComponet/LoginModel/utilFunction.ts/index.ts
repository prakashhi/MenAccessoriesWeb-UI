"use client";

import { UsePanel } from "@/context/Context";
import { setAuthData } from "@/utils/localStorageUtil";

export function UserLoginCredential(token?: string) {
  const { setUser } = UsePanel();

  const loginUser = () => {
    let data = {
      id: "4d2a0f6d-6808-480d-b78d-91852f8ac2e6",
      userFirstName: "Prakash",
      userLastName: "Prajapati",
      contactNumber: "1234567890",
      email: "prakash398prajapati@gmail.com",
      createdAt: "2026-01-03T09:28:23.467Z",
      updatedAt: "2026-01-03T09:28:23.467Z",
      deletedAt: null,
    };
    setAuthData("UserData", JSON.stringify(data), 24 * 60 * 60 * 1000);
    setAuthData(
      "Token",
      JSON.stringify(process.env.NEXT_PUBLIC_USER_TOKEN),
      24 * 60 * 60 * 1000
    );
    setUser(data);
  };

  return { loginUser };
}
