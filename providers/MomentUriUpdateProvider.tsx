"use client";

import React, { createContext, useContext, useMemo } from "react";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";

const MomentUriUpdateContext = createContext<ReturnType<typeof useUpdateMomentURI> | undefined>(
  undefined
);

const MomentUriUpdateProvider = ({ children }: { children: React.ReactNode }) => {
  const momentUriUpdate = useUpdateMomentURI();

  const value = useMemo(() => ({ ...momentUriUpdate }), [momentUriUpdate]);

  return (
    <MomentUriUpdateContext.Provider value={value}>{children}</MomentUriUpdateContext.Provider>
  );
};

const useMomentUriUpdateProvider = () => {
  const context = useContext(MomentUriUpdateContext);
  if (!context) {
    throw new Error("useMomentUriUpdateProvider must be used within a MomentUriUpdateProvider");
  }
  return context;
};

export { MomentUriUpdateProvider, useMomentUriUpdateProvider };
