import HorizontalFeed from "../HorizontalFeed";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { useLatestFeed } from "@/hooks/useLatestFeed";

const Feed: FC = () => {
  const { isLoading, data, error } = useLatestFeed();
  if (isLoading) return <Skeleton className="w-full max-w-4xl mx-auto h-20" />;
  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  return <HorizontalFeed feeds={data || []} shouldCollect />;
};

export default Feed;
