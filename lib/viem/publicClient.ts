import { createPublicClient, http, PublicClient } from "viem";
import getViemNetwork from "./getViemNetwork";
import { baseSepolia } from "viem/chains";
import { CHAIN_ID } from "@/lib/consts";

export const getPublicClient = (chainId: number = CHAIN_ID) => {
  const chain = getViemNetwork(chainId);
  return createPublicClient({
    chain,
    transport: http(),
  }) as PublicClient;
};

export const publicClient = getPublicClient(baseSepolia.id);
