"use client";

import useZoraMintComment from "@/hooks/useZoraMintComment";
import React, { createContext, useContext, useMemo } from "react";

const ZoraMintCommentContext = createContext<
  ReturnType<typeof useZoraMintComment> | undefined
>(undefined);

const ZoraMintCommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const zoraMintComment = useZoraMintComment();

  const value = useMemo(() => ({ ...zoraMintComment }), [zoraMintComment]);

  return (
    <ZoraMintCommentContext.Provider value={value}>
      {children}
    </ZoraMintCommentContext.Provider>
  );
};

const useZoraMintCommentProvider = () => {
  const context = useContext(ZoraMintCommentContext);
  if (!context) {
    throw new Error(
      "useZoraMintCommentProvider must be used within a ZoraMintCommentProvider",
    );
  }
  return context;
};

export { ZoraMintCommentProvider, useZoraMintCommentProvider };
