"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import TimelineHero from "@/components/Timeline/TimelineHero";
import MobileMomentsSection from "@/components/Timeline/MobileMomentsSection";
import { useInProcessMomentsSocket } from "@/hooks/useInProcessMomentsSocket";
import useIsMobile from "@/hooks/useIsMobile";
import MobileTimeline from "./MobileTimeline";

const TimelinePage = () => {
  const { error } = useTimelineProvider();
  useInProcessMomentsSocket();
  const isMobile = useIsMobile();

  if (error) return <main>Error loading timeline.</main>;

  return (
    <main className="relative flex grow flex-col px-2 md:px-10">
      <TimelineHero />
      <MobileMomentsSection />
      {isMobile && <MobileTimeline />}
    </main>
  );
};

export default TimelinePage;
