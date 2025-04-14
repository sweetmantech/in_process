import { Address } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID, PERMISSION_BIT_MINTER } from "@/lib/consts";
import { erc20MinterAddresses, zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { useQuery } from "@tanstack/react-query";

export type SaleConfig = {
  saleStart: string;
  saleEnd: string;
  maxTokensPerAddress: string;
  pricePerToken: bigint;
  fundsRecipient: Address;
  type: string;
};
async function fetchSaleConfig(
  tokenContract: Address,
  tokenId: string,
): Promise<SaleConfig> {
  const publicClient: any = getPublicClient(CHAIN_ID);
  const permissions = await publicClient.readContract({
    address: tokenContract,
    abi: zoraCreator1155ImplABI,
    functionName: "permissions",
    args: [tokenId, erc20MinterAddresses[CHAIN_ID]],
  });
  if (permissions === BigInt(PERMISSION_BIT_MINTER)) {
    const data = await publicClient.readContract({
      address: erc20MinterAddresses[CHAIN_ID],
      abi: erc20MinterABI,
      functionName: "sale",
      args: [tokenContract, tokenId],
    });

    return {
      ...data,
      type: "ZoraErc20Mint",
    };
  }
  const data = await publicClient.readContract({
    address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    functionName: "sale",
    args: [tokenContract, tokenId],
  });

  return {
    ...data,
    type: "ZoraFixedPriceMint",
  };
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
