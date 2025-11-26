"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import { useMomentsSpiral } from "@/hooks/useMomentsSpiral";

const MomentsSpiralContext = createContext<ReturnType<typeof useMomentsSpiral> | undefined>(
  undefined
);

interface MomentsSpiralProviderProps {
  children: ReactNode;
}

export const MomentsSpiralProvider = ({ children }: MomentsSpiralProviderProps) => {
  const spiral = useMomentsSpiral();

  const value = useMemo(
    () => ({
      ...spiral,
    }),
    [spiral]
  );

  return <MomentsSpiralContext.Provider value={value}>{children}</MomentsSpiralContext.Provider>;
};

export const useMomentsSpiralProvider = () => {
  const context = useContext(MomentsSpiralContext);
  if (!context) {
    throw new Error("useMomentsSpiralProvider must be used within a MomentsSpiralProvider");
  }
  return context;
};

export default MomentsSpiralProvider;
