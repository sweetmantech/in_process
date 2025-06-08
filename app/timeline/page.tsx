"use client";

import { TimelineApiProvider as TimelineProvider } from "@/providers/TimelineApiProvider";
import TimelinePage from "@/components/Timeline/TimelinePage";

const Timeline = () => {
  return (
    <TimelineProvider>
      <TimelinePage />
    </TimelineProvider>
  );
};

export default Timeline;
