import HorizontalFeed from "../HorizontalFeed";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import Loading from "../Loading";
import { useTimelineContext } from "@/providers/TimelineProvider";
import FetchMoreInspector from "../FetchMoreInspector";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import GridFeed from "../GridFeed";

interface TimelineFeedProps {
  alt: "timeline" | "grid";
}

const TimelineFeed = ({ alt }: TimelineFeedProps) => {
  const isMobile = useIsMobile();
  const { moments, isLoading, fetchMore } = useTimelineContext();
  const reversedMoments = [...moments].reverse();

  if (!Boolean(reversedMoments.length))
    return (
      <div className="grow flex items-center justify-center">
        {isLoading ? (
          <Loading className="w-[180px] aspect-[1/1] md:w-[300px]" />
        ) : (
          <p className="font-archivo text-lg md:text-5xl">No moments yet!</p>
        )}
      </div>
    );

  if (alt === "grid")
    return (
      <>
        {isMobile ? <VerticalFeed /> : <GridFeed />}
        <FetchMoreInspector fetchMore={fetchMore} />
      </>
    );

  return (
    <HorizontalFeedAnimationProvider feeds={reversedMoments}>
      <HorizontalFeed feeds={reversedMoments} />
    </HorizontalFeedAnimationProvider>
  );
};

export default TimelineFeed;
