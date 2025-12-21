"use client";

import useSocialWallet from "@/hooks/useSocialWallet";
import { createContext, useMemo, useContext } from "react";

const SocialWalletBalanceContext = createContext<ReturnType<typeof useSocialWallet>>(
  {} as ReturnType<typeof useSocialWallet>
);

interface ISocialWalletBalanceProvider {
  children: React.ReactNode;
}

const SocialWalletBalanceProvider = ({ children }: ISocialWalletBalanceProvider) => {
  const socialWallet = useSocialWallet();

  const value = useMemo(
    () => ({
      ...socialWallet,
    }),
    [socialWallet]
  );

  return (
    <SocialWalletBalanceContext.Provider value={value}>
      {children}
    </SocialWalletBalanceContext.Provider>
  );
};

export const useSocialWalletBalanceProvider = () => {
  const context = useContext(SocialWalletBalanceContext);
  if (!context) {
    throw new Error(
      "useSocialWalletBalanceProvider must be used within a SocialWalletBalanceProvider"
    );
  }
  return context;
};

export default SocialWalletBalanceProvider;
