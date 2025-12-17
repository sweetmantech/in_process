import TimelineMoments from "../TimelineMoments";
import { TimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import Loading from "../Loading";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import FetchMoreInspector from "../FetchMoreInspector";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import GridFeed from "../GridFeed";

interface MomentsTimelineProps {
  alt: "timeline" | "grid";
}

const MomentsTimeline = ({ alt }: MomentsTimelineProps) => {
  const isMobile = useIsMobile();
  const { moments, isLoading, fetchMore } = useTimelineProvider();
  const reversedMoments = [...moments].reverse();

  if (!reversedMoments.length)
    return (
      <div className="flex items-center justify-center">
        {isLoading ? (
          <Loading className="aspect-[1/1] w-[100px] md:w-[200px]" />
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
    <TimelineAnimationProvider moments={reversedMoments}>
      <TimelineMoments moments={reversedMoments} />
    </TimelineAnimationProvider>
  );
};

export default MomentsTimeline;
