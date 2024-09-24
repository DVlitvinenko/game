import React, { createContext, useContext } from "react";
import MainStore from "./MainStore";

const StoreContext = createContext<MainStore | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = new MainStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
