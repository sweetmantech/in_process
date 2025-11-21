"use client";

import useMomentCollect from "@/hooks/useMomentCollect";
import React, { createContext, useContext, useMemo } from "react";

const MomentCollectContext = createContext<ReturnType<typeof useMomentCollect> | undefined>(
  undefined
);

const MomentCollectProvider = ({ children }: { children: React.ReactNode }) => {
  const momentCollect = useMomentCollect();

  const value = useMemo(() => ({ ...momentCollect }), [momentCollect]);

  return <MomentCollectContext.Provider value={value}>{children}</MomentCollectContext.Provider>;
};

const useMomentCollectProvider = () => {
  const context = useContext(MomentCollectContext);
  if (!context) {
    throw new Error("useMomentCollectProvider must be used within a MomentCollectProvider");
  }
  return context;
};

export { MomentCollectProvider, useMomentCollectProvider };
