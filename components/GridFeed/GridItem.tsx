import { useMetadata } from "@/hooks/useMetadata";
import { Collection } from "@/types/token";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Loading from "../Loading";

interface GridItemProps {
  feed: Collection;
}

const GridItem = ({ feed }: GridItemProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);

  return (
    <div className="col-span-1 aspect-video w-full overflow-hidden relative bg-tan-400 rounded-md">
      {isLoading ? (
        <Loading className="size-full bg-tan-secondary border border-grey" />
      ) : (
        <Image
          src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
          alt={data?.name || ""}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          blurDataURL={data?.image}
          unoptimized
        />
      )}
    </div>
  );
};

export default GridItem;
