import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Collection } from "@/types/token";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);

  return (
    <div className="w-full h-[200px] md:h-auto aspect-video overflow-hidden relative rounded-md">
      {isLoading ? (
        <Skeleton className="size-full" />
      ) : (
        <Image
          src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
          objectFit="cover"
          objectPosition="top left"
          layout="fill"
          alt="not found"
          blurDataURL={
            getFetchableUrl(data?.image) || "/images/placeholder.png"
          }
        />
      )}
    </div>
  );
};
export default SliderFeed;
