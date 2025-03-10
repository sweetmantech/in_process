import HorizontalFeed from "../HorizontalFeed";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { useLatestFeed } from "@/hooks/useLatestFeed";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import useIsMobile from "@/hooks/useIsMobile";
import VerticalFeed from "../VerticalFeed";

const Feed: FC = () => {
  const { isLoading, data, error } = useLatestFeed();
  const isMobile = useIsMobile();

  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isMobile) return <VerticalFeed feeds={data || []} />;

  return (
    <HorizontalFeedAnimationProvider totalFeeds={data?.length || 0}>
      <HorizontalFeed feeds={data || []} />
    </HorizontalFeedAnimationProvider>
  );
};

export default Feed;
