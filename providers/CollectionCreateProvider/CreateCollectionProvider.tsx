"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useCreateCollection } from "@/hooks/useCreateCollection";

const CreateCollectionContext = createContext<ReturnType<typeof useCreateCollection> | undefined>(
  undefined
);

export const CreateCollectionProvider = ({ children }: { children: ReactNode }) => {
  const collectionCreate = useCreateCollection();

  const value = useMemo(() => collectionCreate, [collectionCreate]);

  return (
    <CreateCollectionContext.Provider value={value}>{children}</CreateCollectionContext.Provider>
  );
};

export const useCreateCollectionProvider = () => {
  const context = useContext(CreateCollectionContext);
  if (!context) {
    throw new Error("useCreateCollectionProvider must be used within a CreateCollectionProvider");
  }
  return context;
};
