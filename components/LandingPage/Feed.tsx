import { useLatestFeed } from "@/hooks/useLatestFeed";
import HorizontalFeed from "../HorizontalFeed";
import { Skeleton } from "../ui/skeleton";
import FeedTable from "../FeedTable";

interface FeedProps {
  layout: "horizontal" | "vertical";
}
const Feed = ({ layout = "horizontal" }: FeedProps) => {
  const { error, isLoading, data } = useLatestFeed();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full max-w-4xl mx-auto h-20" />;
  if (layout === "horizontal") return <HorizontalFeed feeds={data || []} />;
  return <FeedTable feeds={data || []} />;
};

export default Feed;
