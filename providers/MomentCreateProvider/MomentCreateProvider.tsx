"use client";

import useMomentCreate from "@/hooks/useMomentCreate";
import React, { createContext, useContext, useMemo } from "react";

type MomentCreateContextValue = ReturnType<typeof useMomentCreate>;

const MomentCreateContext = createContext<MomentCreateContextValue | undefined>(undefined);

const MomentCreateProvider = ({ children }: { children: React.ReactNode }) => {
  const momentCreate = useMomentCreate();

  const value = useMemo(
    () => ({
      ...momentCreate,
    }),
    [momentCreate]
  );

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
