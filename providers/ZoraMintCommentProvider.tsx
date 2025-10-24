"use client";

import useMomentCollect from "@/hooks/useMomentCollect";
import React, { createContext, useContext, useMemo } from "react";

const ZoraMintCommentContext = createContext<ReturnType<typeof useMomentCollect> | undefined>(
  undefined
);

const ZoraMintCommentProvider = ({ children }: { children: React.ReactNode }) => {
  const zoraMintComment = useMomentCollect();

  const value = useMemo(() => ({ ...zoraMintComment }), [zoraMintComment]);

  return (
    <ZoraMintCommentContext.Provider value={value}>{children}</ZoraMintCommentContext.Provider>
  );
};

const useMomentCollectProvider = () => {
  const context = useContext(ZoraMintCommentContext);
  if (!context) {
    throw new Error("useMomentCollectProvider must be used within a ZoraMintCommentProvider");
  }
  return context;
};

export { ZoraMintCommentProvider, useMomentCollectProvider };
