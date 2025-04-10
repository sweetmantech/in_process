import HorizontalFeed from "../HorizontalFeed";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import GridFeed from "../GridFeed";
import Loading from "../Loading";
import { useFeedProvider } from "@/providers/FeedProvider";
import FetchMoreInspector from "../FetchMoreInspector";

interface FeedProps {
  alt: "timeline" | "grid";
}

const Feed = ({ alt }: FeedProps) => {
  const isMobile = useIsMobile();
  const { feeds, fetchMore } = useFeedProvider();

  if (!feeds.length)
    return (
      <div className="grow flex items-center justify-center">
        <Loading className="w-[180px] aspect-[1/1] md:w-[300px]" />
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
    <HorizontalFeedAnimationProvider totalFeeds={feeds?.length || 0}>
      <HorizontalFeed feeds={feeds} fetchMore={fetchMore} />
    </HorizontalFeedAnimationProvider>
  );
};

export default Feed;
