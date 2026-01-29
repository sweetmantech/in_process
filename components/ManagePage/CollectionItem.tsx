import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useRouter } from "next/navigation";
import truncated from "@/lib/truncated";
import HideButton from "../TimelineMoments/HideButton";
import { type TimelineMoment } from "@/types/moment";
import CollectionItemSkeleton from "./CollectionItemSkeleton";

const CollectionItem = ({ c }: { c: TimelineMoment }) => {
  const { data, isLoading } = useMetadata(c.uri);
  const { push } = useRouter();

  const handleClick = () => {
    const shortNetworkName = getShortNetworkName(c.chain_id === 8453 ? "base" : "base sepolia");
    push(`/manage/${shortNetworkName}:${c.address}`);
    return;
  };

  if (isLoading) return <CollectionItemSkeleton />;
  if (data)
    return (
      <div
        role="button"
        tabIndex={0}
        className="col-span-1 w-full cursor-pointer overflow-hidden rounded-lg bg-grey-moss-300"
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute bottom-2 right-2 z-20">
            <HideButton moment={c} />
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
          <p className="text-left font-archivo text-white">{truncated(data?.name, 30)}</p>
          <p className="text-left font-archivo text-white">{truncateAddress(c.address)}</p>
        </div>
      </div>
    );
};

export default CollectionItem;
