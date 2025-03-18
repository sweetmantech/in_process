import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Collection } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);

  return (
    <div className="w-full h-[200px] md:h-auto aspect-video overflow-hidden relative rounded-md">
      {isLoading ? (
        <div className="size-full flex justify-center items-center bg-tan-secondary border border-grey rounded-md">
          <Loading className="size-3/4" />
        </div>
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
