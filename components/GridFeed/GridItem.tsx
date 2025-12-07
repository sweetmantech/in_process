import { useMetadata } from "@/hooks/useMetadata";
import { TimelineMoment } from "@/types/moment";
import Loading from "../Loading";
import ContentRenderer from "../Renderers";

interface GridItemProps {
  feed: TimelineMoment;
}

const GridItem = ({ feed }: GridItemProps) => {
  const { data, isLoading } = useMetadata(feed.uri);

  return (
    <div className="col-span-1">
      {isLoading || !data ? (
        <Loading className="size-full border border-grey bg-grey-moss-100" />
      ) : (
        <>
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-grey-moss-100 font-spectral">
            <ContentRenderer metadata={data} />
          </div>
          <div className="px-2 pt-2">
            <p className="font-archivo text-sm">{data.name}</p>
            <p className="font-archivo text-sm">{new Date(feed.created_at).toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GridItem;
