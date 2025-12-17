import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import { useMomentNavigation } from "@/hooks/useMomentNavigation";
import CarouselItem from "./CarouselItem";
import { TimelineMoment } from "@/types/moment";

interface SliderFeedProps {
  feed: TimelineMoment;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.uri);
  const { handleMomentClick } = useMomentNavigation(feed);
  return (
    <button
      className="relative h-[200px] w-full overflow-hidden rounded-md bg-grey-moss-100 font-spectral md:h-auto"
      type="button"
      onClick={handleMomentClick}
    >
      {isLoading || !data ? (
        <div className="flex size-full items-center justify-center rounded-md border border-grey bg-grey-moss-100">
          <Loading className="size-3/4" />
        </div>
      ) : (
        <CarouselItem metadata={data} />
      )}
    </button>
  );
};
export default SliderFeed;
