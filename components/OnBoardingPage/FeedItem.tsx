import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Token } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";
import ArtistName from "../ArtistName";
import truncated from "@/lib/truncated";

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
    <div className="w-full">
      <div className="w-full aspect-video relative mt-14 bg-grey-moss-100">
        <Image
          src={getFetchableUrl(data?.image) || ""}
          alt="not found img"
          objectFit="contain"
          objectPosition="center"
          layout="fill"
          className="absolute"
        />
      </div>
      <div className="flex justify-between items-center pt-4">
        <p className="font-spectral-medium-italic">
          {truncated(data?.name || "")}
        </p>
        <ArtistName address={feed.creator} className="!font-archivo-medium" />
      </div>
      <p className="font-archivo">
        {new Date(feed.released_at).toLocaleString()}
      </p>
    </div>
  );
};

export default FeedItem;
