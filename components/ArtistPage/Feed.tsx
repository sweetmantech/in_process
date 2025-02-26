import HorizontalFeed from "../HorizontalFeed";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { useLatestFeed } from "@/hooks/useLatestFeed";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";

const Feed: FC = () => {
  const { isLoading, data, error } = useLatestFeed();
  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  return (
    <HorizontalFeedAnimationProvider totalFeeds={data?.length || 0}>
      <HorizontalFeed feeds={data || []} />
    </HorizontalFeedAnimationProvider>
  );
};

export default Feed;
