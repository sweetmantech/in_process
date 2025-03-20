import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Collection } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";
import { useRouter } from "next/navigation";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);
  const { push } = useRouter();

  const handleClick = () => {
    push(`/${feed.creator}`);
  };

  return (
    <button
      className="w-full h-[200px] md:h-auto aspect-video overflow-hidden relative rounded-md"
      type="button"
      onClick={handleClick}
    >
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
    </button>
  );
};
export default SliderFeed;
