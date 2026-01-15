"use client";

import { UsePanel } from "@/context/Context";
import { UserGetDetailType } from "@/Type/UserDetailType";
import { setAuthData } from "@/utils/localStorageUtil";

export function UserLoginCredential() {
  const { setUser } = UsePanel();

  const loginUser = (userData: UserGetDetailType, token: string) => {
    let Token = token;
    // let data = {
    //   id: "4d2a0f6d-6808-480d-b78d-91852f8ac2e6",
    //   userFirstName: "Prakash",
    //   userLastName: "Prajapati",
    //   contactNumber: "1234567890",
    //   email: "prakash398prajapati@gmail.com",
    //   createdAt: "2026-01-03T09:28:23.467Z",
    //   updatedAt: "2026-01-03T09:28:23.467Z",
    //   deletedAt: null,
    // };

    let Data = userData;
    setAuthData("UserData", JSON.stringify(Data), 24 * 60 * 60 * 1000);
    setAuthData("Token", JSON.stringify(Token), 24 * 60 * 60 * 1000);
    setUser(Data);
  };

  return { loginUser };
}
