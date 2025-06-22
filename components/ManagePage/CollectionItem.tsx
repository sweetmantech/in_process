import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useRouter } from "next/navigation";
import truncated from "@/lib/truncated";
import HideButton from "../HorizontalFeed/HideButton";
import { TimelineMoment } from "@/hooks/useTimelineApi";

const CollectionItem = ({ c }: { c: TimelineMoment }) => {
  const { data, isLoading } = useMetadata(c.uri);
  const { push } = useRouter();

  const handleClick = () => {
    const shortNetworkName = getShortNetworkName(
      c.chainId === 8453 ? "base" : "base sepolia"
    );
    push(`/manage/${shortNetworkName}:${c.address}`);
    return;
  };

  if (isLoading) return <div></div>;
  if (data)
    return (
      <button
        type="button"
        className="col-span-1 w-full bg-grey-moss-300 rounded-lg overflow-hidden"
        onClick={handleClick}
      >
        <div className="w-full aspect-video overflow-hidden relative">
          <div className="absolute bottom-2 right-2 z-20">
            <HideButton
              moment={{
                address: c.address,
                tokenId: c.tokenId,
                chainId: c.chainId,
                id: c.id || `${c.address}-${c.tokenId}`,
                uri: c.uri,
                admin: c.admin,
                createdAt: c.createdAt,
                username: c.username || "",
                hidden: c.hidden,
              }}
            />
          </div>
          <Image
            src={getFetchableUrl(data.image) || "/images/placeholder.png"}
            alt="not found img"
            unoptimized
            className="absolute z-[1]"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
        <div className="px-4 py-2">
          <p className="font-archivo text-white text-left">
            {truncated(data?.name, 30)}
          </p>
          <p className="font-archivo text-white text-left">
            {truncateAddress(c.address)}
          </p>
        </div>
      </button>
    );
};

export default CollectionItem;
