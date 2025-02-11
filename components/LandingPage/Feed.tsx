import { useLatestFeed } from "@/hooks/useLatestFeed";
import HorizontalFeed from "../HorizontalFeed";
import { Skeleton } from "../ui/skeleton";
import { FC } from "react";

const Feed: FC<void>  = () => {
  const { isLoading, data, error } = useLatestFeed();

  if (isLoading) return <Skeleton  className="w-full max-w-4xl mx-auto h-20" />
  if (error) return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  return <HorizontalFeed feed={data || []} />;
};

export default Feed;
