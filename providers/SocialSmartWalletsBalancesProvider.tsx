"use client";

import useSocialSmartWallets from "@/hooks/useSocialSmartWallets";
import { createContext, useMemo, useContext } from "react";

const SocialSmartWalletsBalancesContext = createContext<ReturnType<typeof useSocialSmartWallets>>(
  {} as ReturnType<typeof useSocialSmartWallets>
);

interface ISocialSmartWalletsBalancesProvider {
  children: React.ReactNode;
}

const SocialSmartWalletsBalancesProvider = ({ children }: ISocialSmartWalletsBalancesProvider) => {
  const socialSmartWallets = useSocialSmartWallets();

  const value = useMemo(
    () => ({
      ...socialSmartWallets,
    }),
    [socialSmartWallets]
  );

  return (
    <SocialSmartWalletsBalancesContext.Provider value={value}>
      {children}
    </SocialSmartWalletsBalancesContext.Provider>
  );
};

export const useSocialSmartWalletsBalancesProvider = () => {
  const context = useContext(SocialSmartWalletsBalancesContext);
  if (!context) {
    throw new Error(
      "useSocialSmartWalletsBalancesProvider must be used within a SocialSmartWalletsBalancesProvider"
    );
  }
  return context;
};

export default SocialSmartWalletsBalancesProvider;
