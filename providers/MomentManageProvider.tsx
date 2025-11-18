"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  MomentCreateFormProvider,
  useMomentCreateFormProvider,
} from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

type MomentManageContextValue = ReturnType<typeof useMomentCreateFormProvider>;

const MomentManageContext = createContext<MomentManageContextValue | undefined>(undefined);

const MomentManageProviderInner = ({ children }: { children: React.ReactNode }) => {
  const createForm = useMomentCreateFormProvider();

  const value = useMemo(() => ({ ...createForm }), [createForm]);

  return <MomentManageContext.Provider value={value}>{children}</MomentManageContext.Provider>;
};

const MomentManageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MomentCreateFormProvider>
      <MomentManageProviderInner>{children}</MomentManageProviderInner>
    </MomentCreateFormProvider>
  );
};

const useMomentManageProvider = () => {
  const context = useContext(MomentManageContext);
  if (!context) {
    throw new Error("useMomentManageProvider must be used within a MomentManageProvider");
  }
  return context;
};

export { MomentManageProvider, useMomentManageProvider };
