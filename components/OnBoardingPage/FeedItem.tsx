import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Token } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";
import ArtistName from "../ArtistName";

interface FeedItemProps {
  feed: Token;
}

const FeedItem = ({ feed }: FeedItemProps) => {
  const { data, isLoading } = useMetadata(feed.uri);
  console.log('Metadata data:', data);
  if (isLoading)
    return (
      <div className="w-full aspect-video bg-grey-moss-100 rounded-lg flex items-center justify-center mt-14">
        <Loading className="size-full" />
      </div>
    );
  return (
    <div className="flex flex-col">
      <div className="w-full aspect-video relative bg-grey-moss-100">
        <Image
          src={getFetchableUrl(data?.image) || ""}
          alt="not found img"
          fill
          objectFit="contain"
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <p className="font-spectral-medium-italic text-sm md:text-lg">{data?.name}</p>
          <ArtistName className="font-archivo-medium text-sm md:text-[16px]" address={feed.creator} />
        </div>
          <p className="font-archivo-medium text-xs md:text-[16px] mt-1 md:mt-0">{new Date(feed.released_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FeedItem;
