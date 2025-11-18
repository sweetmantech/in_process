"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMomentMetadata from "@/hooks/useMomentMetadata";

const MomentMetadataContext = createContext<ReturnType<typeof useMomentMetadata> | undefined>(
  undefined
);

const MomentMetadataProvider = ({ children }: { children: React.ReactNode }) => {
  const momentMetadata = useMomentMetadata();

  const value = useMemo(() => ({ ...momentMetadata }), [momentMetadata]);

  return <MomentMetadataContext.Provider value={value}>{children}</MomentMetadataContext.Provider>;
};

const useMomentMetadataProvider = () => {
  const context = useContext(MomentMetadataContext);
  if (!context) {
    throw new Error("useMomentMetadataProvider must be used within a MomentMetadataProvider");
  }
  return context;
};

export { MomentMetadataProvider, useMomentMetadataProvider };
