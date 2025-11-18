"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMomentForm from "@/hooks/useMomentForm";

const MomentFormContext = createContext<ReturnType<typeof useMomentForm> | undefined>(undefined);

const MomentFormProvider = ({ children }: { children: React.ReactNode }) => {
  const momentForm = useMomentForm();

  const value = useMemo(() => ({ ...momentForm }), [momentForm]);

  return <MomentFormContext.Provider value={value}>{children}</MomentFormContext.Provider>;
};

const useMomentFormProvider = () => {
  const context = useContext(MomentFormContext);
  if (!context) {
    throw new Error("useMomentFormProvider must be used within a MomentFormProvider");
  }
  return context;
};

export { MomentFormProvider, useMomentFormProvider };
