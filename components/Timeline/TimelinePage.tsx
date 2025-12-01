"use client";

import { useTimelineProvider } from "@/providers/TimelineProvider";
import Loading from "@/components/Loading";
import TimelineHero from "@/components/Timeline/TimelineHero";
import MobileMomentsSection from "@/components/Timeline/MobileMomentsSection";
import TimelineSpiral from "@/components/Timeline/TimelineSpiral";
import TimelineMobileMoon from "@/components/Timeline/TimelineMobileMoon";
import HorizontalTimeline from "@/components/Timeline/HorizontalTimeline";
import { TimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import TimelineGrid from "@/components/Timeline/TimelineGrid";

const TimelinePage = () => {
  const { isLoading, error, moments } = useTimelineProvider();

  if (isLoading)
    return (
      <div className="grow flex justify-center items-center overflow-hidden">
        <Loading className="w-[200px] aspect-[1/1] md:w-[400px]" />
      </div>
    );
  if (error) return <main>Error loading timeline.</main>;

  return (
    <main className="px-2 md:px-10 relative grow flex flex-col">
      <TimelineHero />
      <TimelineSpiral />
      <MobileMomentsSection />
      <div className="pt-8 md:pt-28">
        <TimelineMobileMoon />
      </div>
      <TimelineGrid />
      <div className="block md:hidden overflow-hidden h-[300px] pb-20">
        <TimelineAnimationProvider moments={moments}>
          <HorizontalTimeline />
        </TimelineAnimationProvider>
      </div>
    </main>
  );
};

export default TimelinePage;
