import { useMetadata } from "@/hooks/useMetadata";
import { Token } from "@/types/token";
import Loading from "../Loading";
import ContentRenderer from "../Token/ContentRenderer";

interface GridItemProps {
  feed: Token;
}

const GridItem = ({ feed }: GridItemProps) => {
  const { data, isLoading } = useMetadata(feed.uri);

  return (
    <div className="col-span-1 aspect-video w-full overflow-hidden relative bg-grey-moss-100 rounded-md">
      {isLoading || !data ? (
        <Loading className="size-full bg-grey-moss-100 border border-grey" />
      ) : (
        <ContentRenderer metadata={data} />
      )}
    </div>
  );
};

export default GridItem;
