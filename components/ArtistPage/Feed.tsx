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
  const { feeds, fetchMore } = useArtistFeedProvider();

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
    <HorizontalFeedAnimationProvider feeds={feeds}>
      <HorizontalFeed feeds={feeds} fetchMore={fetchMore} />
    </HorizontalFeedAnimationProvider>
  );
};

export default Feed;
