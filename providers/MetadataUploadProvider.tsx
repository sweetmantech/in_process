"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMetadataUpload from "@/hooks/useMetadataUpload";

const MetadataUploadContext = createContext<ReturnType<typeof useMetadataUpload> | undefined>(
  undefined
);

const MetadataUploadProvider = ({ children }: { children: React.ReactNode }) => {
  const metadataUpload = useMetadataUpload();

  const value = useMemo(() => ({ ...metadataUpload }), [metadataUpload]);

  return <MetadataUploadContext.Provider value={value}>{children}</MetadataUploadContext.Provider>;
};

const useMetadataUploadProvider = () => {
  const context = useContext(MetadataUploadContext);
  if (!context) {
    throw new Error("useMetadataUploadProvider must be used within a MetadataUploadProvider");
  }
  return context;
};

export { MetadataUploadProvider, useMetadataUploadProvider };
