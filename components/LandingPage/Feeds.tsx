import { useLatestFeed } from "@/hooks/useLatestFeed";
import { Skeleton } from "../ui/skeleton";
import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";
import ArtSlider from "./ArtSlider";
import { SpiralAnimationProvider } from "@/providers/SpiralAnimationProvider";
import { SPIRAL_POINTS } from "@/lib/consts";

const Feeds = () => {
  const { error, isLoading, data } = useLatestFeed();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full h-20" />;
  return (
    <div className="pt-20">
      <SpiralAnimationProvider
        config={{
          points: SPIRAL_POINTS,
          spacing: 500,
          baseSpeed: 0.5,
        }}
        feeds={data || []}
      >
        <SpiralFeeds className="relative z-[2] pr-20" />
      </SpiralAnimationProvider>
      <div className="w-full grid grid-cols-12 pb-6 gap-6 relative z-[1]">
        <div className="col-span-9 pr-20">
          <FeedTable feeds={data || []} />
        </div>
        <div className="col-span-3 relative">
          <div className="absolute bottom-0 flex flex-col gap-6">
            <ArtSlider feeds={data || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
