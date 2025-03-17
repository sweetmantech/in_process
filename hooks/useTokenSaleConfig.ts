import { Address } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/consts";
import { zoraCreatorFixedPriceSaleStrategyABI } from "@zoralabs/protocol-deployments";
import { useQuery } from "@tanstack/react-query";

export type SaleConfig = {
  saleStart: string;
  saleEnd: string;
  maxTokensPerAddress: string;
  pricePerToken: string;
  fundsRecipient: Address;
};
async function fetchSaleConfig(
  tokenContract: Address,
  tokenId: string,
): Promise<SaleConfig> {
  const publicClient: any = getPublicClient(CHAIN_ID);
  const data = await publicClient.readContract({
    address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    functionName: "sale",
    args: [tokenContract, tokenId],
  });

  return data;
}

const useTokenSaleConfig = (tokenContract: Address, tokenId: string) => {
  return useQuery({
    queryKey: ["tokenSalePrice", tokenContract, tokenId],
    queryFn: () => fetchSaleConfig(tokenContract, tokenId),
    enabled: Boolean(tokenContract && tokenId),
    refetchOnMount: true,
  });
};

export default useTokenSaleConfig;
