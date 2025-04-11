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
      <div className="w-full aspect-[1/1] relative flex items-center justify-center mt-14">
        <Loading className="size-full" />
      </div>
    );
  return (
    <div className="w-full aspect-[1/1] relative mt-14">
      <Image
        src={getFetchableUrl(data?.image) || ""}
        alt="not found img"
        objectFit="contain"
        objectPosition="center"
        layout="fill"
        className="absolute"
      />
    </div>
  );
};

export default FeedItem;
