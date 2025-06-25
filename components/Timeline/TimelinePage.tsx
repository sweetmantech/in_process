"use client";

import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import Loading from "@/components/Loading";
import TimelineHero from "@/components/Timeline/TimelineHero";
import MobileMomentsSection from "@/components/Timeline/MobileMomentsSection";
import TimelineSpiral from "@/components/Timeline/TimelineSpiral";
import TimelineMobileMoon from "@/components/Timeline/TimelineMobileMoon";
import HorizontalTimeline from "@/components/Timeline/HorizontalTimeline";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";
import TimelineGrid from "@/components/Timeline/TimelineGrid";

const TimelinePage = () => {
  const { data, isLoading, error, moments } = useTimelineApiContext();
  const tokens = mapMomentsToTokens(moments);

  if (isLoading)
    return (
      <div className="grow flex justify-center items-center overflow-hidden">
        <Loading className="w-[200px] aspect-[1/1] md:w-[400px]" />
      </div>
    );
  if (error) return <main>Error loading timeline.</main>;

  const totalCount = data?.pagination.total_count ?? 0;

  return (
    <main className="px-2 md:px-10 relative grow flex flex-col">
      <TimelineHero totalCount={totalCount} />
      <TimelineSpiral />
      <MobileMomentsSection totalCount={totalCount} />
      <div className="pt-8 md:pt-28">
        <TimelineMobileMoon />
      </div>
      <TimelineGrid />
      <div className="block md:hidden overflow-hidden h-[300px] pb-20">
        <HorizontalFeedAnimationProvider feeds={tokens}>
          <HorizontalTimeline />
        </HorizontalFeedAnimationProvider>
      </div>
    </main>
  );
};

export default TimelinePage;
