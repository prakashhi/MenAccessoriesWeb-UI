"use client";
import { createContext, useContext, useState } from "react";


const SearchPanelContext = createContext();

export function SearchPanelContextProvider({children}:Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState({
    isSearchPanel: false,
  });

  return (
    <SearchPanelContext.Provider value={{ setState, state }}>
      {children}
    </SearchPanelContext.Provider>
  );
}

export const UsePanel = () => useContext(SearchPanelContext);
