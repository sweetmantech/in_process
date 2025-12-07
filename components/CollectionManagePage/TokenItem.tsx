import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useRouter } from "next/navigation";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Skeleton } from "../ui/skeleton";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { useUserProvider } from "@/providers/UserProvider";
import HideButton from "../TimelineMoments/HideButton";

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
    <section className="col-span-1 flex aspect-[1/1] cursor-pointer flex-col" onClick={handleClick}>
      {isLoading ? (
        <Skeleton className="size-full" />
      ) : (
        <>
          <div className="relative grow overflow-hidden bg-grey-moss-100">
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
          <div className="flex items-center justify-between gap-6 py-2">
            <p className="font-archivo text-grey-moss-900">{data?.name}</p>
            <p className="rounded-md bg-grey-moss-100 px-2 font-archivo text-sm text-grey-moss-900">
              id: {t.tokenId}
            </p>
            {connectedAddress && (
              <HideButton
                moment={{
                  address: collection.address,
                  token_id: t.tokenId.toString(),
                  chain_id: collection.chainId,
                  id: `${collection.address}-${t.tokenId.toString()}`,
                  uri: t.uri,
                  max_supply: 0,
                  default_admin: {
                    address: connectedAddress,
                    username: "",
                    hidden: false,
                  },
                  admins: [],
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
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
