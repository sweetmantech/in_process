import { useLatestFeed } from "@/hooks/useLatestFeed";
import { Skeleton } from "../ui/skeleton";
import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";
import ArtSlider from "./ArtSlider";
import useIsMobile from "../../hooks/useIsMobile";

const Feeds = () => {
  const { error, isLoading, data } = useLatestFeed();
  const isMobile = useIsMobile();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full h-20" />;
  return (
    <div className="pt-24 md:pt-20">
      {!isMobile && (
        <div className="hidden md:block">
          <SpiralFeeds className="relative z-[2] pr-20" feeds={data || []} />
        </div>
      )}
      <div className="w-full space-y-4 md:grid md:grid-cols-12 pb-6 gap-10 relative z-[1]">
        <div className="block md:hidden col-span-12 w-full">
          <ArtSlider feeds={data || []} />
        </div>
        <div className="w-full md:col-span-8">
          <FeedTable feeds={data || []} />
        </div>
        <div className="hidden md:block col-span-4 relative">
          <div className="w-full absolute bottom-0 flex flex-col gap-6">
            <ArtSlider feeds={data || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
