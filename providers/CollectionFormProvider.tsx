"use client";

import React, { createContext, useContext, useMemo } from "react";
import useCollectionForm from "@/hooks/useCollectionForm";

const CollectionFormContext = createContext<ReturnType<typeof useCollectionForm> | undefined>(
  undefined
);

const CollectionFormProvider = ({ children }: { children: React.ReactNode }) => {
  const collectionForm = useCollectionForm();

  const value = useMemo(() => ({ ...collectionForm }), [collectionForm]);

  return <CollectionFormContext.Provider value={value}>{children}</CollectionFormContext.Provider>;
};

const useCollectionFormProvider = () => {
  const context = useContext(CollectionFormContext);
  if (!context) {
    throw new Error("useCollectionFormProvider must be used within a CollectionFormProvider");
  }
  return context;
};

export { CollectionFormProvider, useCollectionFormProvider };
