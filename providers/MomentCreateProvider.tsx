"use client";

import useCreateMoment from "@/hooks/useCreateMoment";
import React, { createContext, useContext, useMemo } from "react";

const MomentCreateContext = createContext<ReturnType<typeof useCreateMoment> | undefined>(
  undefined
);

const MomentCreateProvider = ({ children }: { children: React.ReactNode }) => {
  const zoraCreate = useCreateMoment();

  const value = useMemo(() => ({ ...zoraCreate }), [zoraCreate]);

  return <MomentCreateContext.Provider value={value}>{children}</MomentCreateContext.Provider>;
};

const useMomentCreateProvider = () => {
  const context = useContext(MomentCreateContext);
  if (!context) {
    throw new Error("useMomentCreateProvider must be used within a MomentCreateProvider");
  }
  return context;
};

export { MomentCreateProvider, useMomentCreateProvider };
