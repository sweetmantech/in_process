import { createContext, useContext, ReactNode, useMemo } from "react";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";
import { TimelineMoment } from "@/types/moment";

const TimelineAnimationContext = createContext<ReturnType<typeof useTimelineAnimation> | null>(
  null
);

export function TimelineAnimationProvider({
  children,
  moments,
}: {
  children: ReactNode;
  moments: TimelineMoment[];
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
