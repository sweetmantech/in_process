import { useMetadata } from "@/hooks/useMetadata";
import { Collection } from "@/types/token";
import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useRouter } from "next/navigation";
import truncated from "@/lib/truncated";
import HideButton from "../HorizontalFeed/HideButton";

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
          <div className="absolute bottom-2 right-2 z-20">
            <HideButton
              moment={{
                owner: c.creator,
                tokenContract: c.newContract,
                tokenId: "1",
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
            {truncateAddress(c.newContract)}
          </p>
        </div>
      </button>
    );
};

export default CollectionItem;
