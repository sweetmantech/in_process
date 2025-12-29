"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { usePhoneVerify } from "@/hooks/usePhoneVerify";

const PhoneVerificationContext = createContext<ReturnType<typeof usePhoneVerify>>(
  {} as ReturnType<typeof usePhoneVerify>
);

export const PhoneVerificationProvider = ({ children }: { children: ReactNode }) => {
  const phoneVerify = usePhoneVerify();

  const value = useMemo(
    () => ({
      ...phoneVerify,
    }),
    [phoneVerify]
  );

  return (
    <PhoneVerificationContext.Provider value={value}>{children}</PhoneVerificationContext.Provider>
  );
};

export const usePhoneVerificationProvider = () => {
  const context = useContext(PhoneVerificationContext);
  if (!context) {
    throw new Error("usePhoneVerificationProvider must be used within a PhoneVerificationProvider");
  }
  return context;
};
