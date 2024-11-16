import { createPublicClient, http, PublicClient } from "viem";
import getViemNetwork from "./getViemNetwork";
import { baseSepolia } from "viem/chains";

export const getPublicClient = (chainId: number) => {
  console.log("CHAIN ID", chainId);
  const chain = getViemNetwork(chainId);
  console.log("CHAIN", chain);
  return createPublicClient({
    chain,
    transport: http(),
  }) as PublicClient;
};

export const publicClient = getPublicClient(baseSepolia.id);
