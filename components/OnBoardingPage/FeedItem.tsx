import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Token } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";
import truncated from "@/lib/truncated";
import { useRouter } from "next/navigation";
import { useInProcessProvider } from "@/providers/InProcessProvider";
import truncateAddress from "@/lib/truncateAddress";

interface FeedItemProps {
  feed: Token;
}
const FeedItem = ({ feed }: FeedItemProps) => {
  const { data, isLoading } = useMetadata(feed.uri);
  const { push } = useRouter();
  const { profiles } = useInProcessProvider();

  if (isLoading)
    return (
      <div className="w-full aspect-[1/1] relative flex items-center justify-center mt-14">
        <Loading className="size-full" />
      </div>
    );
  return (
    <button
      type="button"
      className="w-full"
      onClick={() => push(`/${feed.creator}`)}
    >
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
        <p className="font-archivo text-sm">
          {profiles[`${feed.creator}`]?.username ||
            truncateAddress(feed.creator)}
        </p>
      </div>
      <p className="font-archivo text-left">
        {new Date(feed.released_at).toLocaleString()}
      </p>
    </button>
  );
};

export default FeedItem;
