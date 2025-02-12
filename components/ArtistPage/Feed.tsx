import { useArtistFeed } from "@/hooks/useArtistFeed";
import HorizontalFeed from "../HorizontalFeed";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const Feed: FC = () => {
  const { isLoading, data, error } = useArtistFeed();
  if (isLoading) return <Skeleton className="w-full max-w-4xl mx-auto h-20" />;
  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  return <HorizontalFeed feed={data || []} />;
};

export default Feed;
