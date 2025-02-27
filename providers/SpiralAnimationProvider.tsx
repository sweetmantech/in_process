import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { SpiralConfig } from "@/types/spiral";
import { Collection } from "@/types/token";
import React, { createContext, useContext, useMemo, useState } from "react";

interface SpiralAnimationContextProps {
  config: SpiralConfig;
  feeds: Collection[];
  children: React.ReactNode;
}
const SpiralAnimationContext = createContext<
  ReturnType<typeof useSpiralAnimation> | undefined
>(undefined);

export const SpiralAnimationProvider: React.FC<SpiralAnimationContextProps> = ({
  children,
  feeds,
  config,
}) => {
  const spiral = useSpiralAnimation(config, feeds);
  const value = useMemo(
    () => ({
      ...spiral,
    }),
    [spiral],
  );
  return (
    <SpiralAnimationContext.Provider value={value}>
      {children}
    </SpiralAnimationContext.Provider>
  );
};

export const useSpiralAnimationProvider = () => {
  const context = useContext(SpiralAnimationContext);
  if (!context) {
    throw new Error(
      "useSpiralAnimationProvider must be used within a SpiralAnimationProvider",
    );
  }
  return context;
};
