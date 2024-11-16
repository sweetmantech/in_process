import { createPublicClient, http, PublicClient } from "viem";
import getViemNetwork from "./getViemNetwork";
import { baseSepolia } from "viem/chains";

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId);
  return createPublicClient({
    chain,
    transport: http(),
  }) as PublicClient;
};

export const publicClient = getPublicClient(baseSepolia.id);
