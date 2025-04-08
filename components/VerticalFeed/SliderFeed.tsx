import { useMetadata } from "@/hooks/useMetadata";
import { Collection } from "@/types/token";
import { Skeleton } from "../ui/skeleton";
import ContentRenderer from "../Token/ContentRenderer";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);

  return (
    <div className="w-full h-[250px] md:h-auto overflow-hidden relative">
      {isLoading || !data ? (
        <Skeleton className="size-full" />
      ) : (
        <div className="gap-2 flex flex-col size-full">
          <div className="grow overflow-hidden w-full relative rounded-[0px] bg-tan-400">
            <ContentRenderer metadata={data} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pl-2">
              <div className="rotate-[45deg] w-[9px] aspect-[1/1] bg-black" />
              <p className="font-spectral text-sm">{feed?.name}</p>
            </div>
            <p className="font-archivo text-sm lowercase">
              {new Date(feed.released_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SliderFeed;
