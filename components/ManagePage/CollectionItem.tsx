import { useMetadata } from "@/hooks/useMetadata";
import { Collection } from "@/types/token";
import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useRouter } from "next/navigation";
import truncated from "@/lib/truncated";

const CollectionItem = ({ c }: { c: Collection }) => {
  const { data, isLoading } = useMetadata(c.contractURI);
  const { push } = useRouter();

  const handleClick = () => {
    const shortNetworkName = getShortNetworkName(c.chain.replaceAll("_", " "));
    push(`/manage/${shortNetworkName}:${c.newContract}`);
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
          <div className="absolute z-[10] bg-white/30 backdrop-blur-[4px] size-full left-0 top-0" />
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
            {truncateAddress(c.newContract)}
          </p>
        </div>
      </button>
    );
};

export default CollectionItem;
