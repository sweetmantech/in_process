import { useMomentClick } from "@/hooks/useMomentClick";
import useVideoRefresh from "@/hooks/useVideoRefresh";
import { TimelineMoment } from "@/types/moment";
import ContentRenderer from "../Renderers";

interface SliderFeedProps {
  feed: TimelineMoment;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { handleMomentClick, data: metadata } = useMomentClick(feed);
  const { handleRefresh } = useVideoRefresh(feed);
  return (
    <div
      role="button"
      tabIndex={0}
      className="w-full cursor-pointer overflow-hidden rounded-md font-spectral"
      onClick={handleMomentClick}
      onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
    >
      <div className="w-full">
        <ContentRenderer metadata={metadata} variant="natural" onRefresh={handleRefresh} />
      </div>
    </div>
  );
};
export default SliderFeed;
