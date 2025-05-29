import HorizontalFeed from "../HorizontalFeed";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import GridFeed from "../GridFeed";
import Loading from "../Loading";
import FetchMoreInspector from "../FetchMoreInspector";
import { useArtistFeedProvider } from "@/providers/ArtistFeedProvider";

interface FeedProps {
  alt: "timeline" | "grid";
}

const Feed = ({ alt }: FeedProps) => {
  const isMobile = useIsMobile();
  const { feeds, fetchMore, isFetchingCollections, isFetchingTokens } =
    useArtistFeedProvider();

  if (!Boolean(feeds.length))
    return (
      <div className="grow flex items-center justify-center">
        {isFetchingCollections || isFetchingTokens ? (
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

export default Feed;
