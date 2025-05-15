import useTimeline from "@/hooks/useTimeline";
import { createContext, useMemo, useContext } from "react";

const TimelineContext = createContext<ReturnType<typeof useTimeline>>(
  {} as ReturnType<typeof useTimeline>,
);

const TimelineProvider = ({ children }: { children: React.ReactNode }) => {
  const timeline = useTimeline();

  const value = useMemo(
    () => ({
      ...timeline,
    }),
    [timeline],
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineProvider = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error(
      "useTimelineProvider must be used within a TimelineProvider",
    );
  }
  return context;
};

export default TimelineProvider;
