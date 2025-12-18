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
      <div className="flex grow items-center justify-center overflow-hidden">
        <Loading className="aspect-[1/1] w-[200px] md:w-[400px]" />
      </div>
    );
  if (error) return <main>Error loading timeline.</main>;

  return (
    <main className="relative flex grow flex-col px-2 md:px-10">
      <TimelineHero />
      <MobileMomentsSection />
      <div className="block h-[300px] overflow-hidden pb-20 md:hidden">
        <TimelineAnimationProvider moments={moments}>
          <HorizontalTimeline />
        </TimelineAnimationProvider>
      </div>
      <div className="pt-4">
        <TimelineMobileMoon />
      </div>
      <TimelineGrid />
      <TimelineSpiral />
    </main>
  );
};

export default TimelinePage;
