import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useRouter } from "next/navigation";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Skeleton } from "../ui/skeleton";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { useUserProvider } from "@/providers/UserProvider";
import HideButton from "../HorizontalFeed/HideButton";

const TokenItem = ({
  t,
}: {
  t: {
    tokenId: bigint;
    uri: string;
  };
}) => {
  const { data, isLoading } = useMetadata(t.uri);
  const { push } = useRouter();
  const { collection } = useCollectionProvider();
  const { connectedAddress } = useUserProvider();

  const handleClick = () => {
    if (isLoading) return;
    push(
      `/manage/${networkConfigByChain[collection.chainId].zoraCollectPathChainName}:${collection.address as string}/${t.tokenId.toString()}`
    );
    return;
  };

  return (
    <section
      className="col-span-1 aspect-[1/1] flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      {isLoading ? (
        <Skeleton className="size-full" />
      ) : (
        <>
          <div className="relative grow bg-grey-moss-100 overflow-hidden">
            <div className="absolute z-[10] bg-white/30 backdrop-blur-[4px] size-full left-0 top-0" />
            <Image
              src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
              alt="not found img"
              unoptimized
              className="absolute z-[1]"
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
            />
          </div>
          <div className="py-2 flex gap-6 justify-between items-center">
            <p className="font-archivo text-grey-moss-900">{data?.name}</p>
            <p className="font-archivo text-sm text-grey-moss-900 bg-grey-moss-100 rounded-md px-2">
              id: {t.tokenId}
            </p>
            {connectedAddress && (
              <HideButton
                moment={{
                  owner: connectedAddress,
                  tokenContract: collection.address,
                  tokenId: Number(t.tokenId),
                }}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TokenItem;
