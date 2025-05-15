import getTokensAndUris from "@/lib/viem/getTokensAndUris";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

const fetchTokens = async (address: Address, chainId: number) => {
  const data = await getTokensAndUris(address, chainId);
  return data;
};

const useTokens = (collection: { address: Address; chainId: number }) => {
  return useQuery({
    queryKey: ["tokens", collection.address, collection.chainId],
    queryFn: () => fetchTokens(collection.address, collection.chainId),
    enabled: Boolean(collection.address && collection.chainId),
  });
};

export default useTokens;
