import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";
import ArtSlider from "./ArtSlider";
import LatestFeeds from "./LatestFeeds";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import HorizontalFeed from "../HorizontalFeed";
import useIsMobile from "@/hooks/useIsMobile";
import Loading from "../Loading";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import OnboardingModalWrapper from "../OnboardingModal/OnboardingModalWrapper";
import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";

const Feeds = () => {
  const { feeds, collections, fetchMore } = useInProcessFeedProvider();
  const isMobile = useIsMobile();
  const { push } = useRouter();

  if (!feeds.length)
    return (
      <div className="grow flex justify-center items-center overflow-hidden">
        <Loading className="w-[200px] aspect-[1/1] md:w-[400px]" />
      </div>
    );
  return (
    <div className="pt-16 md:pt-20">
      <p className="font-archivo text-2xl md:text-5xl px-4 md:px-0 pt-6 pb-4 md:pt-12">
        {collections?.length} moments
        <br />
        have been shared
      </p>
      <Button
        className="bg-black hover:bg-grey-moss-300 text-white font-archivo text-xl px-8 rounded-sm hidden md:flex"
        onClick={() => push("/create")}
      >
        create
      </Button>
      <SpiralFeeds />
      <div className="w-full space-y-4 md:grid md:grid-cols-12 pb-6 gap-10 relative z-30">
        <div className="w-full hidden md:block md:col-span-8">
          <FeedTable />
        </div>
        <LatestFeeds />
        <div className="hidden md:block col-span-4 relative">
          <div className="w-full absolute bottom-0 flex flex-col gap-6">
            <ArtSlider />
          </div>
        </div>
        {isMobile && (
          <HorizontalFeedAnimationProvider totalFeeds={feeds?.length || 0}>
            <HorizontalFeed feeds={feeds || []} fetchMore={fetchMore} />
          </HorizontalFeedAnimationProvider>
        )}
      </div>
      <OnboardingModalWrapper />
    </div>
  );
};

export default Feeds;
