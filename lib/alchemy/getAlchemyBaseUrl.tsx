import {
  base,
  baseSepolia,
  optimism,
  optimismSepolia,
  sepolia,
  mainnet,
} from "viem/chains";

const ETH = "https://eth-mainnet.g.alchemy.com/";
const SEPOLIA = "https://eth-sepolia.g.alchemy.com/";
const BASE = "https://base-mainnet.g.alchemy.com/";
const BASE_SEPOLIA = "https://base-sepolia.g.alchemy.com/";
const OP = "https://opt-mainnet.g.alchemy.com/";
const OP_SEPOLIA = "https://opt-sepolia.g.alchemy.com/";

const getAlchemyBaseUrl = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return ETH;
    case sepolia.id:
      return SEPOLIA;
    case baseSepolia.id:
      return BASE_SEPOLIA;
    case base.id:
      return BASE;
    case optimism.id:
      return OP;
    case optimismSepolia.id:
      return OP_SEPOLIA;
    default:
      return BASE;
  }
};

export default getAlchemyBaseUrl;
