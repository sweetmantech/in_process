"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useCreateCollectionModalTrigger } from "@/hooks/useCreateCollectionModalTrigger";

const CreateCollectionModalTriggerContext = createContext<
  ReturnType<typeof useCreateCollectionModalTrigger> | undefined
>(undefined);

export const CreateCollectionModalTriggerProvider = ({ children }: { children: ReactNode }) => {
  const modalTrigger = useCreateCollectionModalTrigger();

  const value = useMemo(() => modalTrigger, [modalTrigger]);

  return (
    <CreateCollectionModalTriggerContext.Provider value={value}>
      {children}
    </CreateCollectionModalTriggerContext.Provider>
  );
};

export const useCreateCollectionModalTriggerProvider = () => {
  const context = useContext(CreateCollectionModalTriggerContext);
  if (!context) {
    throw new Error(
      "useCreateCollectionModalTriggerProvider must be used within a CreateCollectionModalTriggerProvider"
    );
  }
  return context;
};
