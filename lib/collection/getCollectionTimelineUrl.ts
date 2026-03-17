import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";

export const getCollectionTimelineUrl = (
  chainId: number | undefined,
  address: string | undefined,
  siteUrl: string
): string | undefined => {
  if (chainId === undefined || !address) return undefined;
  const networkConfig = networkConfigByChain[chainId];
  if (!networkConfig) return undefined;
  return `${siteUrl}/collection/${networkConfig.zoraCollectPathChainName}:${address}`;
};
