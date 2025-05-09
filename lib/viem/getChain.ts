import { base, baseSepolia } from "viem/chains";
import { CHAIN } from "../consts";

const getChain = (chainId: number) => {
  switch (chainId) {
    case baseSepolia.id:
      return baseSepolia;
    case base.id:
      return base;
    default:
      return CHAIN;
  }
};

export default getChain;
