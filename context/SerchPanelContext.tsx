"use client";
import { createContext, useContext, useState } from "react";
import { product } from "./Types/type";

const SearchPanelContext = createContext();

export function SearchPanelContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartProduct, setCartProduct] = useState<product[]>([]);
  const [likeProduct, setLikeProduct] = useState<product[]>([]);

  const AddCartProduct = (Product: product): void => {
    if (!cartProduct.find((val) => val.id == Product.id)) {
      setCartProduct((prev) => [...prev, Product]);
    }
  };
  const RemoveCartProduct = (ProductId: number): void => {
    setCartProduct((prev) =>
      cartProduct.filter((val, index) => val.id !== ProductId)
    );
  };

  const AddLikeProduct = (Product: product): void => {
    if (!likeProduct.find((val) => (val.id = Product.id))) {
      const AddLikeProduct = (Product: product): void =>
        setLikeProduct((prev) => [...prev, Product]);
    }
  };

  const RemoveLikeProdcut = (ProductId: number): void => {
    setLikeProduct(likeProduct.filter((val) => val.id !== ProductId));
  };

  return (
    <SearchPanelContext.Provider
      value={{
        AddCartProduct,
        RemoveCartProduct,
        cartProduct,
        AddLikeProduct,
        RemoveLikeProdcut,
        likeProduct,
      }}
    >
      {children}
    </SearchPanelContext.Provider>
  );
}

export const UsePanel = () => useContext(SearchPanelContext);
