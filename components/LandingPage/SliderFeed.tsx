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
    <div className="w-full aspect-video overflow-hidden relative flex justify-center items-center rounded-md">
      {isLoading ? (
        <Skeleton className="size-full" />
      ) : (
        <Image
          src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
          className="object-cover w-full"
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
