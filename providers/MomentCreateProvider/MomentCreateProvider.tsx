"use client";

import React, { createContext, useContext } from "react";

type MomentCreateContextValue = {
  createdContract: any;
  [key: string]: any;
};

const MomentCreateContext = createContext<MomentCreateContextValue | undefined>(undefined);

const MomentCreateProvider = ({ children }: { children: React.ReactNode }) => {
  const value: MomentCreateContextValue = {
    createdContract: null,
  };

  return <MomentCreateContext.Provider value={value}>{children}</MomentCreateContext.Provider>;
};

export const useMomentCreateProvider = () => {
  const context = useContext(MomentCreateContext);
  if (!context) {
    throw new Error("useMomentCreateProvider must be used within a MomentCreateProvider");
  }
  return context;
};

export { MomentCreateProvider };
