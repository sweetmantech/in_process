"use client";

import React, {createContext, useContext, useMemo} from "react";
import useCreateMetadata from "@/hooks/useCreateMetadata";

const ZoraManageContext = createContext<
  ReturnType<typeof useCreateMetadata> | undefined
>(undefined);

const ZoraManageProvider = ({ children }: { children: React.ReactNode }) => {
  const editMetadata = useCreateMetadata();

  const value = useMemo(() => ({ ...editMetadata }), [editMetadata]);

  return (
    <ZoraManageContext.Provider value={value}>
      {children}
    </ZoraManageContext.Provider>
  );
};

const useZoraManageProvider = () => {
  const context = useContext(ZoraManageContext);
  if (!context) {
    throw new Error(
      "useZoraManageProvider must be used within a ZoraManageProvider",
    );
  }
  return context;
};

export { ZoraManageProvider, useZoraManageProvider };
