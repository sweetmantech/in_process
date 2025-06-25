"use client";

import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import Loading from "@/components/Loading";
import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";
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
      {/* Hero Section */}
      <div className="pt-12 pb-4 flex flex-col md:flex-row md:justify-between md:items-start">
        {/* Description Text */}
        <div className="mb-8 md:mb-0">
          <h1 className="font-archivo text-2xl md:text-5xl tracking-[-1px] text-black">
            an onchain collective timeline
          </h1>
          <p className="font-spectral-italic text-2xl md:text-5xl tracking-[-1px] text-black mt-1">
            for artists
          </p>
        </div>
        
        {/* Moments Count + Create Button (Desktop: Right side, Mobile: Below description) */}
        <div className="flex flex-col items-center md:items-end">
          <MomentCount count={totalCount} />
          <div className="mt-2">
            <CreateButton />
          </div>
        </div>
      </div>

      <TimelineSpiral />
      <div className="pt-28">
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
