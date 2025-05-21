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
import { useInProcessProvider } from "@/providers/InProcessProvider";
import { useMeasure } from "react-use";

const Feeds = () => {
  const { feeds, collections, fetchMore } = useInProcessProvider();
  const isMobile = useIsMobile();
  const { push } = useRouter();
  const [tableRef, { height }] = useMeasure();

  if (!feeds.length)
    return (
      <div className="grow flex justify-center items-center overflow-hidden">
        <Loading className="w-[200px] aspect-[1/1] md:w-[400px]" />
      </div>
    );
  return (
    <div>
      <p className="text-center md:text-left font-archivo-medium text-2xl md:text-5xl px-4 md:px-0 pb-4 pt-12">
        {collections?.length} moments
        <br />
        have been shared
      </p>
      <div className="flex justify-center md:justify-start">
        <Button
          className="md:mt-2 bg-black hover:bg-grey-moss-300 text-grey-eggshell font-archivo text-xl md:text-[22px] py-4 md:py-6 px-16 md:px-24 rounded-sm"
          onClick={() => push("/create")}
        >
          create
        </Button>
      </div>
      <SpiralFeeds />
      <div className="w-full space-y-4 md:grid md:grid-cols-12 pb-6 gap-10 relative z-30 pt-20">
        <div
          className="w-full hidden md:block md:col-span-8 h-fit"
          ref={tableRef as any}
        >
          <FeedTable />
        </div>
        <LatestFeeds />
        <div
          className="hidden md:block col-span-4 relative"
          style={{
            height,
          }}
        >
          <ArtSlider />
        </div>
        {isMobile && (
          <HorizontalFeedAnimationProvider feeds={feeds}>
            <HorizontalFeed feeds={feeds || []} fetchMore={fetchMore} />
          </HorizontalFeedAnimationProvider>
        )}
      </div>
      <OnboardingModalWrapper />
    </div>
  );
};

export default Feeds;
