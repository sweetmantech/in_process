"use client";

import useSmartWallet from "@/hooks/useSmartWallet";
import { createContext, useMemo, useContext } from "react";

const SmartWalletContext = createContext<ReturnType<typeof useSmartWallet>>(
  {} as ReturnType<typeof useSmartWallet>
);

interface ISmartWalletProvider {
  children: React.ReactNode;
}
const SmartWalletProvider = ({ children }: ISmartWalletProvider) => {
  const smartWallet = useSmartWallet();

  const value = useMemo(
    () => ({
      ...smartWallet,
    }),
    [smartWallet]
  );

  return <SmartWalletContext.Provider value={value}>{children}</SmartWalletContext.Provider>;
};

export const useSmartWalletProvider = () => {
  const context = useContext(SmartWalletContext);
  if (!context) {
    throw new Error("useSmartWalletProvider must be used within a SmartWalletProvider");
  }
  return context;
};

export default SmartWalletProvider;
