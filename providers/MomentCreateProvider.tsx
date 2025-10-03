"use client";

import useZoraCreate from "@/hooks/useZoraCreate";
import React, { createContext, useContext, useMemo } from "react";

const MomentCreateContext = createContext<
  ReturnType<typeof useZoraCreate> | undefined
>(undefined);

const MomentCreateProvider = ({ children }: { children: React.ReactNode }) => {
  const zoraCreate = useZoraCreate();

  const value = useMemo(() => ({ ...zoraCreate }), [zoraCreate]);

  return (
    <MomentCreateContext.Provider value={value}>
      {children}
    </MomentCreateContext.Provider>
  );
};

const useMomentCreateProvider = () => {
  const context = useContext(MomentCreateContext);
  if (!context) {
    throw new Error(
      "useMomentCreateProvider must be used within a MomentCreateProvider",
    );
  }
  return context;
};

export { MomentCreateProvider, useMomentCreateProvider };
