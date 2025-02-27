import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Collection } from "@/types/token";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data } = useMetadata(feed.contractURI);

  return (
    <div className="aspect-video overflow-hidden relative flex justify-center items-center rounded-md">
      <img
        src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
        className="object-cover w-full"
      />
    </div>
  );
};
export default SliderFeed;
