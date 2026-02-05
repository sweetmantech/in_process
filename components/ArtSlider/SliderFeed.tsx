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
    <div
      role="button"
      tabIndex={0}
      className="relative w-full cursor-pointer overflow-hidden rounded-md font-spectral"
      onClick={handleMomentClick}
      onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
    >
      {isLoading || !data ? (
        <div className="flex size-full items-center justify-center rounded-md border border-grey bg-grey-moss-100">
          <Loading className="size-3/4" />
        </div>
      ) : (
        <CarouselItem metadata={data} />
      )}
    </div>
  );
};
export default SliderFeed;
