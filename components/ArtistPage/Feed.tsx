import HorizontalFeed from "../HorizontalFeed";
import { useArtistFeeds } from "@/hooks/useArtistFeeds";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";
import GridFeed from "../GridFeed";
import Loading from "../Loading";

interface FeedProps {
  alt: "timeline" | "grid";
}

const Feed = ({ alt }: FeedProps) => {
  const { isLoading, data, error } = useArtistFeeds();
  const isMobile = useIsMobile();

  if (isLoading)
    return (
      <div className="grow flex items-center justify-center">
        <Loading className="w-[180px] aspect-[1/1] md:w-[300px]" />
      </div>
    );
  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;

  if (alt === "grid")
    return (
      <>
        {isMobile ? (
          <VerticalFeed feeds={data || []} />
        ) : (
          <GridFeed feeds={data || []} />
        )}
      </>
    );

  return (
    <HorizontalFeedAnimationProvider totalFeeds={data?.length || 0}>
      <HorizontalFeed feeds={data || []} />
    </HorizontalFeedAnimationProvider>
  );
};

export default Feed;
