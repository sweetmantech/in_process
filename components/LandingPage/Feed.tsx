import { useLatestFeed } from "@/hooks/useLatestFeed";
import { Skeleton } from "../ui/skeleton";
import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";

interface FeedProps {
  layout: "horizontal" | "vertical";
}
const Feed = ({ layout = "horizontal" }: FeedProps) => {
  const { error, isLoading, data } = useLatestFeed();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (layout === "horizontal") return <SpiralFeeds feeds={data || []} />;
  return <FeedTable feeds={data || []} />;
};

export default Feed;
