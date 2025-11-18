"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMomentCreateForm from "@/hooks/useMomentCreateForm";

const MomentCreateFormContext = createContext<ReturnType<typeof useMomentCreateForm> | undefined>(
  undefined
);

const MomentCreateFormProvider = ({ children }: { children: React.ReactNode }) => {
  const momentCreateForm = useMomentCreateForm();

  const value = useMemo(() => ({ ...momentCreateForm }), [momentCreateForm]);

  return (
    <MomentCreateFormContext.Provider value={value}>{children}</MomentCreateFormContext.Provider>
  );
};

const useMomentCreateFormProvider = () => {
  const context = useContext(MomentCreateFormContext);
  if (!context) {
    throw new Error("useMomentCreateFormProvider must be used within a MomentCreateFormProvider");
  }
  return context;
};

export { MomentCreateFormProvider, useMomentCreateFormProvider };
