"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import TimelineHero from "@/components/Timeline/TimelineHero";
import MobileMomentsSection from "@/components/Timeline/MobileMomentsSection";
// import TimelineSpiral from "@/components/Timeline/TimelineSpiral";
// import TimelineMobileMoon from "@/components/Timeline/TimelineMobileMoon";
// import TimelineGrid from "@/components/Timeline/TimelineGrid";
import { useInProcessMomentsSocket } from "@/hooks/useInProcessMomentsSocket";
import useIsMobile from "@/hooks/useIsMobile";
import MobileTimeline from "./MobileTimeline";

const TimelinePage = () => {
  const { error, moments } = useTimelineProvider();
  useInProcessMomentsSocket();
  const isMobile = useIsMobile();

  if (error) return <main>Error loading timeline.</main>;

  return (
    <main className="relative flex grow flex-col px-2 md:px-10">
      <TimelineHero />
      <MobileMomentsSection />
      {isMobile && <MobileTimeline />}
      {/* <div className="pt-4">
        <TimelineMobileMoon />
      </div> */}
      {/* <TimelineGrid /> */}
      {/* <TimelineSpiral /> */}
    </main>
  );
};

export default TimelinePage;
