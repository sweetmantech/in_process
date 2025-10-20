"use client";

import useTopup from "@/hooks/useTopup";
import { createContext, useMemo, useContext } from "react";

const TopupContext = createContext<ReturnType<typeof useTopup>>({} as ReturnType<typeof useTopup>);

interface ITopupProvider {
  children: React.ReactNode;
}
const TopupProvider = ({ children }: ITopupProvider) => {
  const topup = useTopup();

  const value = useMemo(
    () => ({
      ...topup,
    }),
    [topup]
  );

  return <TopupContext.Provider value={value}>{children}</TopupContext.Provider>;
};

export const useTopupProvider = () => {
  const context = useContext(TopupContext);
  if (!context) {
    throw new Error("useTopupProvider must be used within a TopupProvider");
  }
  return context;
};

export default TopupProvider;
