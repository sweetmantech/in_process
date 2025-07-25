import HorizontalFeed from "../HorizontalFeed";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import Loading from "../Loading";
import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { mapMomentsToTokens } from "@/lib/timeline/mapMomentToToken";
import FetchMoreInspector from "../FetchMoreInspector";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import GridFeed from "../GridFeed";

interface TimelineFeedProps {
  alt: "timeline" | "grid";
}

const TimelineFeed = ({ alt }: TimelineFeedProps) => {
  const isMobile = useIsMobile();
  const { data, moments, isLoading, currentPage, setCurrentPage } =
    useTimelineApiContext();
  const feeds = mapMomentsToTokens(moments.reverse());
  const fetchMore = () => {
    if (data && data.pagination.page < data.pagination.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!Boolean(feeds.length))
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
    <HorizontalFeedAnimationProvider feeds={feeds}>
      <HorizontalFeed feeds={feeds} fetchMore={fetchMore} />
    </HorizontalFeedAnimationProvider>
  );
};

export default TimelineFeed;
