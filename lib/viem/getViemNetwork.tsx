import { mainnet, optimism, sepolia, baseSepolia, optimismSepolia, base, zora } from "viem/chains";

const getViemNetwork = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return mainnet;
    case base.id:
      return base;
    case optimism.id:
      return optimism;
    case sepolia.id:
      return sepolia;
    case baseSepolia.id:
      return baseSepolia;
    case optimismSepolia.id:
      return optimismSepolia;
    case zora.id:
      return zora;
    default:
      return mainnet;
  }
};

export default getViemNetwork;
