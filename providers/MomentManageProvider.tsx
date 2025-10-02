"use client";

import React, {createContext, useContext, useMemo} from "react";
import useCreateMetadata from "@/hooks/useCreateMetadata";

const MomentManageContext = createContext<
  ReturnType<typeof useCreateMetadata> | undefined
>(undefined);

const MomentManageProvider = ({ children }: { children: React.ReactNode }) => {
  const editMetadata = useCreateMetadata();

  const value = useMemo(() => ({ ...editMetadata }), [editMetadata]);

  return (
    <MomentManageContext.Provider value={value}>
      {children}
    </MomentManageContext.Provider>
  );
};

const useMomentManageProvider = () => {
  const context = useContext(MomentManageContext);
  if (!context) {
    throw new Error(
      "useMomentManageProvider must be used within a MomentManageProvider",
    );
  }
  return context;
};

export { MomentManageProvider, useMomentManageProvider };
