import { useLatestFeed } from "@/hooks/useLatestFeed";
import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";
import ArtSlider from "./ArtSlider";
import LatestFeeds from "./LatestFeeds";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import HorizontalFeed from "../HorizontalFeed";
import useIsMobile from "@/hooks/useIsMobile";
import Loading from "../Loading";

const Feeds = () => {
  const { error, isLoading, data } = useLatestFeed();
  const isMobile = useIsMobile();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading)
    return (
      <div className="grow flex justify-center items-center overflow-hidden">
        <Loading className="w-[200px] aspect-[1/1] md:w-[400px]" />
      </div>
    );
  return (
    <div className="pt-16 md:pt-20">
      <p className="font-archivo text-2xl px-4 pt-6 pb-4 block md:hidden">
        today 31 artists have <br />
        shared their moments
      </p>
      <SpiralFeeds feeds={data || []} />
      <div className="w-full space-y-4 md:grid md:grid-cols-12 pb-6 gap-10 relative z-[1]">
        <div className="w-full hidden md:block md:col-span-8">
          <FeedTable feeds={data || []} />
        </div>
        <LatestFeeds feeds={data?.slice(0, 3) || []} />
        <div className="hidden md:block col-span-4 relative">
          <div className="w-full absolute bottom-0 flex flex-col gap-6">
            <ArtSlider feeds={data || []} />
          </div>
        </div>
        {isMobile && (
          <HorizontalFeedAnimationProvider totalFeeds={data?.length || 0}>
            <HorizontalFeed feeds={data || []} />
          </HorizontalFeedAnimationProvider>
        )}
      </div>
    </div>
  );
};

export default Feeds;
