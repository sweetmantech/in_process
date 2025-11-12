"use client";

import React, { createContext, useContext, useMemo } from "react";
import useTokenManageForm from "@/hooks/useTokenManageForm";

const TokenManageFormContext = createContext<ReturnType<typeof useTokenManageForm> | undefined>(
  undefined
);

const TokenManageFormProvider = ({ children }: { children: React.ReactNode }) => {
  const formData = useTokenManageForm();

  const value = useMemo(() => ({ ...formData }), [formData]);

  return (
    <TokenManageFormContext.Provider value={value}>{children}</TokenManageFormContext.Provider>
  );
};

const useTokenManageFormProvider = () => {
  const context = useContext(TokenManageFormContext);
  if (!context) {
    throw new Error("useTokenManageFormProvider must be used within a TokenManageFormProvider");
  }
  return context;
};

export { TokenManageFormProvider, useTokenManageFormProvider };
