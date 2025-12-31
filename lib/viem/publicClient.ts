import { createPublicClient, http, PublicClient } from "viem";
import getViemNetwork from "./getViemNetwork";
import { base, baseSepolia } from "viem/chains";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import getAlchemyRpcUrl from "../alchemy/getAlchemyRpcUrl";

export const getPublicClient = (chainId: number = CHAIN_ID) => {
  const chain = getViemNetwork(chainId) as any;
  const RPC_URL = getAlchemyRpcUrl(chainId);
  return createPublicClient({
    chain,
    transport: http(RPC_URL),
  }) as PublicClient;
};

export const publicClient = getPublicClient(IS_TESTNET ? baseSepolia.id : base.id);
