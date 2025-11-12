"use client";

import React, { createContext, useContext, useMemo } from "react";
import useCreateForm from "@/hooks/useCreateForm";

type MomentManageContextValue = ReturnType<typeof useCreateForm> &
  ReturnType<typeof useCreateForm>["createMetadata"];

const MomentManageContext = createContext<MomentManageContextValue | undefined>(undefined);

const MomentManageProvider = ({ children }: { children: React.ReactNode }) => {
  const createForm = useCreateForm();

  const value = useMemo(
    () => ({
      ...createForm,
      ...createForm.createMetadata,
    }),
    [createForm]
  );

  return <MomentManageContext.Provider value={value}>{children}</MomentManageContext.Provider>;
};

const useMomentManageProvider = () => {
  const context = useContext(MomentManageContext);
  if (!context) {
    throw new Error("useMomentManageProvider must be used within a MomentManageProvider");
  }
  return context;
};

export { MomentManageProvider, useMomentManageProvider };
