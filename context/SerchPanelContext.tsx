"use client";
import { createContext, useContext, useState } from "react";





const SearchPanelContext = createContext();

export function SearchPanelContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  type product = {
    id: number;
    name: string;
    img: string;
    price: number;
  };

  const [cartProduct, setCartProduct] = useState<product[]>([]);

  const AddCartProduct = (Product: product) => {
    if (!cartProduct.find((val) => val.id == Product.id)) {
      setCartProduct((prev) => [...prev, Product]);
     
    }
  };
  const RemoveCartProduct = (ProductId: number) => {
    setCartProduct((prev) =>
      cartProduct.filter((val, index) => val.id !== ProductId)
    );
  };

  return (
    <SearchPanelContext.Provider value={{ AddCartProduct, RemoveCartProduct,cartProduct }}>
      {children}
    </SearchPanelContext.Provider>
  );
}

export const UsePanel = () => useContext(SearchPanelContext);
