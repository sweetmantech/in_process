import * as chains from "viem/chains";
import { VIEM_TO_ZORA } from "@/lib/zora/zoraToViem";

export const getShortNameFromChainId = (chainId?: number): string | undefined => {
  if (!chainId) return undefined;
  const viemChainName = Object.keys(chains).find(
    (name) => (chains as Record<string, { id?: number }>)[name]?.id === chainId
  );
  if (!viemChainName) return undefined;
  return VIEM_TO_ZORA[viemChainName as keyof typeof VIEM_TO_ZORA];
};
