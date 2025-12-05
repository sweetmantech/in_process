import { Skeleton } from "../ui/skeleton";
import useCollectionProfile from "@/hooks/useCollectionProfile";
import { useParams } from "next/navigation";
import * as chains from "viem/chains";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { Address } from "viem";

const MobileProfile = () => {
  const params = useParams();
  const collectionAddress = params.collectionAddress as string;
  const decodedAddress = decodeURIComponent(collectionAddress);
  const [chain, address] = decodedAddress.split(":");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  const { data, isLoading } = useCollectionProfile(address as Address, viemChain.id);
  const collectionName = data?.data?.name || "";

  return (
    <div className="relative">
      <p className="text-xl md:text-5xl font-archivo-medium tracking-[-1px]">
        {isLoading ? <Skeleton className="w-[150px] h-12" /> : collectionName}
      </p>
    </div>
  );
};

export default MobileProfile;
