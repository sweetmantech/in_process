import { useMetadata } from "@/hooks/useMetadata";
import { Collection } from "@/types/token";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

interface GridItemProps {
  feed: Collection;
}

const GridItem = ({ feed }: GridItemProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);

  return (
    <div className="col-span-1 aspect-video w-full overflow-hidden relative">
      {isLoading ? (
        <Skeleton className="size-full" />
      ) : (
        <Image
          layout="fill"
          src={getFetchableUrl(data?.image) || ""}
          alt="not found image"
          objectFit="cover"
          objectPosition="left top"
        />
      )}
    </div>
  );
};

export default GridItem;
