"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import useMomentAdmins from "@/hooks/useMomentAdmins";

const MomentAdminsContext = createContext<ReturnType<typeof useMomentAdmins> | undefined>(
  undefined
);

export function MomentAdminsProvider({ children }: { children: ReactNode }) {
  const momentAdmins = useMomentAdmins();

  const value = useMemo(() => ({ ...momentAdmins }), [momentAdmins]);

  return <MomentAdminsContext.Provider value={value}>{children}</MomentAdminsContext.Provider>;
}

export function useMomentAdminsProvider() {
  const context = useContext(MomentAdminsContext);
  if (context === undefined) {
    throw new Error("useMomentAdminsProvider must be used within a MomentAdminsProvider");
  }
  return context;
}
