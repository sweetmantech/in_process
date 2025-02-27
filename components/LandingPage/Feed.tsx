import { useLatestFeed } from "@/hooks/useLatestFeed";
import { Skeleton } from "../ui/skeleton";
import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";

const Feed = () => {
  const { error, isLoading, data } = useLatestFeed();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full h-20" />;
  return (
    <div className="pt-20">
      <SpiralFeeds feeds={data || []} />
      <div className="w-full grid grid-cols-12 pb-6">
        <div className="col-span-9">
          <FeedTable feeds={data || []} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
