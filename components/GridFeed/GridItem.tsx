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
    <div className="col-span-1 aspect-video w-full overflow-hidden relative">
      {isLoading ? (
        <Loading className="size-full bg-tan-secondary border border-grey" />
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
