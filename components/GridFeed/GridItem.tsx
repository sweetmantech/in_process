import { TimelineMoment } from "@/types/moment";
import Loading from "../Loading";
import ContentRenderer from "../Renderers";
import { useMomentClick } from "@/hooks/useMomentClick";

interface GridItemProps {
  feed: TimelineMoment;
}

const GridItem = ({ feed }: GridItemProps) => {
  const { handleMomentClick, isLoading, data } = useMomentClick(feed);

  return (
    <div className="col-span-1">
      {isLoading || !data ? (
        <Loading className="size-full border border-grey bg-grey-moss-100 aspect-video" />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={handleMomentClick}
          onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
          className="size-full aspect-video flex flex-col cursor-pointer"
        >
          <div className="relative grow w-full overflow-hidden rounded-md bg-grey-moss-100 font-spectral">
            <ContentRenderer metadata={data} />
          </div>
          <div className="px-2 pt-2">
            <p className="font-archivo text-sm text-left truncate">{data.name}</p>
            <p className="font-archivo text-sm text-left">
              {new Date(feed.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridItem;
