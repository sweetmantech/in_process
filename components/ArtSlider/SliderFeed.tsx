import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import CarouselItem from "./CarouselItem";
import { TimelineMoment } from "@/types/moment";

interface SliderFeedProps {
  feed: TimelineMoment;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.uri);
  const { push } = useRouter();

  const handleClick = () => {
    push(`/${feed.default_admin.address}`);
  };

  return (
    <button
      className="w-full h-[200px] md:h-auto overflow-hidden relative rounded-md bg-grey-moss-100 font-spectral"
      type="button"
      onClick={handleClick}
    >
      {isLoading || !data ? (
        <div className="size-full flex justify-center items-center bg-grey-moss-100 border border-grey rounded-md">
          <Loading className="size-3/4" />
        </div>
      ) : (
        <CarouselItem metadata={data} />
      )}
    </button>
  );
};
export default SliderFeed;
