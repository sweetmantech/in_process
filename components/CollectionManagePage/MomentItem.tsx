import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { useUserProvider } from "@/providers/UserProvider";
import HideButton from "../TimelineMoments/HideButton";
import { TimelineMoment } from "@/types/moment";

const MomentItem = ({ m }: { m: TimelineMoment }) => {
  const { push } = useRouter();
  const { connectedAddress } = useUserProvider();
  const { data, isLoading } = useMetadata(m.uri);

  const handleClick = () => {
    if (isLoading) return;
    push(
      `/manage/${networkConfigByChain[m.chain_id].zoraCollectPathChainName}:${m.address}/${m.token_id.toString()}`
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
            <p className="font-archivo text-grey-moss-900 truncate min-w-0 max-w-[200px]">
              {data?.name}
            </p>
            <p className="font-archivo text-sm text-grey-moss-900 bg-grey-moss-100 rounded-md px-2">
              id: {m.token_id}
            </p>
            {connectedAddress && <HideButton moment={m} />}
          </div>
        </>
      )}
    </section>
  );
};

export default MomentItem;
