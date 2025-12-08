import * as chains from "viem/chains";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";

/**
 * Extracts chainId from an address that may contain chain prefix (format: chain:address)
 * @param address - Address that may contain chain prefix (e.g., "base:0x123..." or "0x123...")
 * @returns Object with chainId (if extracted) and the address without chain prefix
 */
export function getChainIdFromAddress(address?: string): {
  chainId: number | undefined;
  addressOnly: string;
} {
  if (!address) {
    return { chainId: undefined, addressOnly: "" };
  }

  if (address.includes(":")) {
    const decodedAddress = decodeURIComponent(address);
    const [chain, addressOnly] = decodedAddress.split(":");
    const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
    const viemChain = chains[viemChainName];
    const chainId = viemChain?.id;
    return { chainId, addressOnly };
  }

  return { chainId: undefined, addressOnly: address };
}
