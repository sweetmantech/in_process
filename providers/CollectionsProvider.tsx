"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useCollections } from "@/hooks/useCollections";

const CollectionsContext = createContext<ReturnType<typeof useCollections>>(
  {} as ReturnType<typeof useCollections>
);

export const CollectionsProvider = ({ children }: { children: ReactNode }) => {
  const collections = useCollections();

  const value = useMemo(() => collections, [collections]);

  return <CollectionsContext.Provider value={value}>{children}</CollectionsContext.Provider>;
};

export const useCollectionsProvider = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollectionsProvider must be used within a CollectionsProvider");
  }
  return context;
};
