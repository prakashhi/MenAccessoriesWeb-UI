"use client";
import { createContext, useContext, useState } from "react";
import { product } from "./Types/type";

import { useDisclosure } from "@heroui/react";

const SearchPanelContext = createContext();

export function SearchPanelContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartProduct, setCartProduct] = useState<product[]>([]);
  const [likeProduct, setLikeProduct] = useState<product[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const AddCartProduct = (
    Product: product,
    type?: string): void => {
    if (!cartProduct.find((val) => val.id == Product.id)) {
      setCartProduct((prev) => [
        ...prev,
        {
          ...Product,
          Quanty: type == "LikeProduct" ? Product.Quanty :  1,
        },
      ]);
    }
  };

  const RemoveCartProduct = (ProductId: number): void => {
    setCartProduct((prev) =>
      cartProduct.filter((val, index) => val.id !== ProductId)
    );
  };

  const AddLikeProduct = (Product: product): void => {
    if (!likeProduct.find((val) => val.id == Product.id)) {
      setLikeProduct((prev) => [...prev, { ...Product, Quanty: 1 }]);
    }
  };

  const RemoveLikeProdcut = (ProductId: number): void => {
    setLikeProduct(likeProduct.filter((val) => val.id !== ProductId));
  };

  return (
    <SearchPanelContext.Provider
      value={{
        setCartProduct,
        AddCartProduct,
        RemoveCartProduct,
        cartProduct,
        AddLikeProduct,
        RemoveLikeProdcut,
        setLikeProduct,
        likeProduct,
        isOpen,
        onOpen,
        onOpenChange,
      }}
    >
      {children}
    </SearchPanelContext.Provider>
  );
}

export const UsePanel = () => useContext(SearchPanelContext);
