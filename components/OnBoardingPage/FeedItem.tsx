import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Token } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";

interface FeedItemProps {
  feed: Token;
}
const FeedItem = ({ feed }: FeedItemProps) => {
  const { data, isLoading } = useMetadata(feed.uri);
  if (isLoading)
    return (
      <div className="w-full aspect-video bg-grey-moss-100 rounded-lg flex items-center justify-center mt-14">
        <Loading className="size-full" />
      </div>
    );
  return (
    <div className="w-full aspect-video relative mt-14 bg-grey-moss-100">
      <Image
        src={getFetchableUrl(data?.image) || ""}
        alt="not found img"
        fill
        objectFit="contain"
      />
    </div>
  );
};

export default FeedItem;
