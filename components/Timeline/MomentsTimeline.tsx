import TimelineMoments from "../TimelineMoments";
import { TimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import Loading from "../Loading";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import FetchMoreInspector from "../FetchMoreInspector";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import Moments from "../MomentsGrid/Moments";

interface MomentsTimelineProps {
  alt: "timeline" | "grid";
}

const MomentsTimeline = ({ alt }: MomentsTimelineProps) => {
  const isMobile = useIsMobile();
  const { moments, isLoading, fetchMore } = useTimelineProvider();
  const reversedMoments = [...moments].reverse();

  if (!reversedMoments.length)
    return (
      <div className="flex w-full items-center justify-center">
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
        {isMobile ? <VerticalFeed /> : <Moments variant="moment" />}
        <FetchMoreInspector fetchMore={fetchMore} />
      </>
    );

  return (
    <TimelineAnimationProvider itemsCount={reversedMoments.length}>
      <TimelineMoments moments={reversedMoments} />
    </TimelineAnimationProvider>
  );
};

export default MomentsTimeline;
