import { Address } from "viem";
import { base, baseSepolia } from "viem/chains";

export const FACTORY_ADDRESSES: Record<number, Address> = {
  [base.id]: "0x4c6b9b23be9dC281C8D49FEDAed89C57a00d3b1f",
  [baseSepolia.id]: "0x6832A997D8616707C7b68721D6E9332E77da7F6C",
} as const;

export function getFactoryAddress(chainId: number): Address {
  const address = FACTORY_ADDRESSES[chainId];
  if (!address) {
    throw new Error(`No factory address configured for chain ${chainId}`);
  }
  return address;
}
