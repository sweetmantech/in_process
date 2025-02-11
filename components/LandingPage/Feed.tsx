import { useLatestFeed } from "@/hooks/useLatestFeed";
import HorizontalFeed from "../HorizontalFeed";
import { Skeleton } from "../ui/skeleton";
import { FC } from "react";

const Feed: FC = () => {
  const { error, isLoading, data } = useLatestFeed();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full max-w-4xl mx-auto h-20" />;
  return <HorizontalFeed feed={data || []} />;
};

export default Feed;
