"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import useInProcessTimeline from "@/hooks/useInProcessTimeline";

const InProcessTimelineContext = createContext<ReturnType<typeof useInProcessTimeline> | undefined>(
  undefined
);

interface InProcessTimelineProviderProps {
  children: ReactNode;
}

export const InProcessTimelineProvider = ({ children }: InProcessTimelineProviderProps) => {
  const inprocessTimeline = useInProcessTimeline();

  const value = useMemo(
    () => ({
      ...inprocessTimeline,
    }),
    [inprocessTimeline]
  );

  return (
    <InProcessTimelineContext.Provider value={value}>{children}</InProcessTimelineContext.Provider>
  );
};

export const useInProcessTimelineProvider = () => {
  const context = useContext(InProcessTimelineContext);
  if (!context) {
    throw new Error("useInProcessTimelineProvider must be used within a InProcessTimelineProvider");
  }
  return context;
};

export default InProcessTimelineProvider;
