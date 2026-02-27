import Loading from "../Loading";
import { useMomentClick } from "@/hooks/useMomentClick";
import { TimelineMoment } from "@/types/moment";
import ContentRenderer from "../Renderers";

interface SliderFeedProps {
  feed: TimelineMoment;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { handleMomentClick, isLoading, data: metadata } = useMomentClick(feed);
  return (
    <div
      role="button"
      tabIndex={0}
      className="w-full cursor-pointer overflow-hidden rounded-md font-spectral"
      onClick={handleMomentClick}
      onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
    >
      {isLoading || !metadata ? (
        <div className="flex size-full items-center justify-center rounded-md border border-grey bg-grey-moss-100">
          <Loading className="size-3/4" />
        </div>
      ) : (
        <div className="w-full">
          <ContentRenderer metadata={metadata} />
        </div>
      )}
    </div>
  );
};
export default SliderFeed;
