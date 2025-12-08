"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMetadataForm from "@/hooks/useMetadataForm";

const MetadataFormContext = createContext<ReturnType<typeof useMetadataForm> | undefined>(
  undefined
);

const MetadataFormProvider = ({ children }: { children: React.ReactNode }) => {
  const metadataForm = useMetadataForm();

  const value = useMemo(() => ({ ...metadataForm }), [metadataForm]);

  return <MetadataFormContext.Provider value={value}>{children}</MetadataFormContext.Provider>;
};

const useMetadataFormProvider = () => {
  const context = useContext(MetadataFormContext);
  if (!context) {
    throw new Error("useMetadataFormProvider must be used within a MetadataFormProvider");
  }
  return context;
};

export { MetadataFormProvider, useMetadataFormProvider };
