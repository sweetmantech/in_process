import Loading from "../Loading";
import { useMomentClick } from "@/hooks/useMomentClick";
import CarouselItem from "./CarouselItem";
import { TimelineMoment } from "@/types/moment";

interface SliderFeedProps {
  feed: TimelineMoment;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { handleMomentClick, isLoading, data } = useMomentClick(feed);
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
