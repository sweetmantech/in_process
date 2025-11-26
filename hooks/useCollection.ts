import { getPublicClient } from "@/lib/viem/publicClient";
import { Metadata } from "@/types/legacy/token";
import { useQuery } from "@tanstack/react-query";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Address } from "viem";

async function fetchCollectionURI(address: Address, chainId: number): Promise<Metadata> {
  const publicClient = getPublicClient(chainId);
  const uri = await publicClient.readContract({
    address,
    abi: zoraCreator1155ImplABI,
    functionName: "contractURI",
  });
  const response = await fetch(`/api/metadata?uri=${uri}`);
  if (!response.ok) throw new Error("failed to get metadata");
  const data = await response.json();
  return data;
}
const useCollection = (address: Address, chainId: number) => {
  return useQuery({
    queryKey: ["collectionURI", address, chainId],
    queryFn: () => fetchCollectionURI(address, chainId),
    enabled: Boolean(address && chainId),
  });
};

export default useCollection;
