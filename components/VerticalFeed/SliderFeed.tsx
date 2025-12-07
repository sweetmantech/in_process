import { useMetadata } from "@/hooks/useMetadata";
import { TimelineMoment } from "@/types/moment";
import { Skeleton } from "../ui/skeleton";
import ContentRenderer from "../Renderers";

interface SliderFeedProps {
  feed: TimelineMoment;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.uri);

  return (
    <div className="relative h-[250px] w-full overflow-hidden md:h-auto">
      {isLoading || !data ? (
        <Skeleton className="size-full" />
      ) : (
        <div className="flex size-full flex-col gap-2">
          <div className="relative w-full grow overflow-hidden rounded-[0px] bg-grey-moss-100">
            <ContentRenderer metadata={data} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pl-2">
              <div className="aspect-[1/1] w-[9px] rotate-[45deg] bg-black" />
              <p className="font-spectral text-sm">{data?.name || ""}</p>
            </div>
            <p className="font-archivo text-sm lowercase">
              {new Date(feed.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SliderFeed;
