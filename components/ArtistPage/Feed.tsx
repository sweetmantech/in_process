import { useArtistFeed } from "@/hooks/useArtistFeed";
import HorizontalFeed from "../HorizontalFeed";
import { FC } from "react";

const Feed: FC<void>  = () => {
  const { isLoading, data, error } = useArtistFeed();

  if (isLoading) 
  if (error) {
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  }

  return <HorizontalFeed feed={data || []} />;
};

export default Feed;
