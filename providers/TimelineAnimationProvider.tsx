import { createContext, useContext, ReactNode, useMemo } from "react";
import { Moment } from "@/types/timeline";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";

const TimelineAnimationContext = createContext<ReturnType<typeof useTimelineAnimation> | null>(
  null
);

export function TimelineAnimationProvider({
  children,
  moments,
}: {
  children: ReactNode;
  moments: Moment[];
}) {
  const timelineAnimation = useTimelineAnimation(moments);

  const value = useMemo(
    () => ({
      ...timelineAnimation,
    }),
    [timelineAnimation]
  );

  return (
    <TimelineAnimationContext.Provider value={value}>{children}</TimelineAnimationContext.Provider>
  );
}

export function useTimelineAnimationProvider() {
  const context = useContext(TimelineAnimationContext);
  if (!context) {
    throw new Error("useTimelineAnimationProvider must be used within a TimelineAnimationProvider");
  }
  return context;
}
