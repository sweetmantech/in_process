"use client";

import usePayments from "@/hooks/usePayments";
import { createContext, useContext, useMemo } from "react";

interface PaymentsContextValue extends ReturnType<typeof usePayments> {}

const PaymentsContext = createContext<PaymentsContextValue | null>(null);

export const PaymentsProvider = ({ children }: { children: React.ReactNode }) => {
  const payments = usePayments();

  const value = useMemo(
    () => ({
      ...payments,
    }),
    [payments]
  );

  return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>;
};

export const usePaymentsProvider = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error("usePaymentsProvider must be used within a PaymentsProvider");
  }
  return context;
};

export default PaymentsProvider;
