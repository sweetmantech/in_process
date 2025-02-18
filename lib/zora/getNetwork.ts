import { base, baseSepolia, zora, zoraSepolia } from "viem/chains";

export const getNetwork = (chainId: number): string => {
  switch (chainId) {
    case base.id:
    case baseSepolia.id:
      return "BASE";
    case zora.id:
    case zoraSepolia.id:
      return "ZORA";
    default:
      return "BASE";
  }
};

export const getNetworkType = (chainId: number): string => {
  switch (chainId) {
    case base.id:
    case zora.id:
      return "MAINNET";
    case baseSepolia.id:
    case zoraSepolia.id:
      return "SEPOLIA";
    default:
      return "MAINNET";
  }
};
