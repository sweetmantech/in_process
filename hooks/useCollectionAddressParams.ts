import { useParams } from "next/navigation";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import useCollection from "@/hooks/useCollection";
import { Address } from "viem";

export const useCollectionAddressParams = () => {
  const params = useParams();
  const collectionAddress = params.collectionAddress as string | undefined;

  const { chainId, address } = parseCollectionAddress(collectionAddress);

  const { data, isLoading } = useCollection({
    collectionAddress: address as Address,
    chainId: chainId?.toString(),
  });

  const collectionName = data?.name || "";

  return {
    collectionName,
    isLoading,
    address,
    chainId,
  };
};
