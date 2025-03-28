import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";
import ArtSlider from "./ArtSlider";
import LatestFeeds from "./LatestFeeds";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import HorizontalFeed from "../HorizontalFeed";
import useIsMobile from "@/hooks/useIsMobile";
import Loading from "../Loading";
import { Button } from "../ui/button";
import getArtistsCounts from "@/lib/getArtistsCount";
import { useRouter } from "next/navigation";
import { useCreatedFeed } from "@/hooks/useCreatedFeed";

const Feeds = () => {
  const { error, isLoading, data } = useCreatedFeed();
  const isMobile = useIsMobile();
  const { push } = useRouter();

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
      <p className="font-archivo text-2xl md:text-5xl px-4 md:px-0 pt-6 pb-4 md:pt-12">
        today {getArtistsCounts(data || [])} artists have <br />
        shared their moments
      </p>
      <Button
        className="bg-black hover:bg-grey-moss-300 text-white font-archivo text-xl px-8 rounded-sm hidden md:flex"
        onClick={() => push("/create")}
      >
        create
      </Button>
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
