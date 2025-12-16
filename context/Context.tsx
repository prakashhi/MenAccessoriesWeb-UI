"use client";
import { createContext, useContext, useState } from "react";
import { product } from "./Types/type";
import { useDisclosure } from "@heroui/react";
import { useApi } from "@/app/useApi";
import { notify } from "@/app/(User)/Component/ToastComponent";

const SearchPanelContext = createContext();

export function SearchPanelContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartProduct, setCartProduct] = useState<product[]>([]);

  const { callApi, loading } = useApi();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const AddCartProduct = async (
    productName: string,
    ProductId: string,
    userId: string
  ) => {
    let response = await callApi("post", "/cart", {
      data: {
        productId: ProductId,
        userId: userId,
      },
    });

    if (response.success == true) {
      notify({
        message: `${productName} added to Cart`,
        type: "success",
      });
    } else {
      notify({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const RemoveCartProduct = async (ProductId: string, userId: string) => {
    let response = await callApi("delete", `/cart/${userId}/${ProductId}`);

    if (response.success == true) {
      notify({
        message: response.message || "Cart item deleted successfully",
        type: "success",
      });
    } else {
      notify({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const AddLikeProduct = async (
    productName: string,
    ProductId: string,
    userId: string
  ) => {
    let response = await callApi("post", "/like-product", {
      data: {
        productId: ProductId,
        userId: userId,
      },
    });

    if (response.success == true) {
      notify({
        message: `${productName} added to Wishlist`,
        type: "success",
      });
    } else {
      notify({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const RemoveLikeProduct = async (ProductId: string, userId: string) => {
    let response = await callApi(
      "delete",
      `/like-product/${userId}/${ProductId}`
    );

    if (response.success == true) {
      notify({
        message: response.message || "Like product deleted successfully",
        type: "success",
      });
    } else {
      notify({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const LikeProductList = async () => {
    let response = await callApi("get", `/like-products/{userId}`);

    // if (response.success !== true) {
    //   notify({
    //     message: response.message || "Something went wrong",
    //     type: "error",
    //   });
    // }

    return response;
  };

  const CartProductList = async () => {
    let response = await callApi("get", `/cart/{userId}`);

    // if (response.success !== true) {
    //   notify({
    //     message: response.message || "Something went wrong",
    //     type: "error",
    //   });
    // }

    return response;
  };
  return (
    <SearchPanelContext.Provider
      value={{
        setCartProduct,
        AddCartProduct,
        RemoveCartProduct,
        cartProduct,
        AddLikeProduct,
        RemoveLikeProduct,
        LikeProductList,
        CartProductList,
        isOpen,
        loading,
        onOpen,
        onOpenChange,
      }}
    >
      {children}
    </SearchPanelContext.Provider>
  );
}

export const UsePanel = () => useContext(SearchPanelContext);
