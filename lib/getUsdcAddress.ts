import { base } from "viem/chains";
import { baseSepolia } from "viem/chains";
import { Address } from "viem";

const getUsdcAddress = (chainId: number) => {
  switch (chainId) {
    case base.id:
      return "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address;
    case baseSepolia.id:
      return "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F" as Address;
    default:
      return "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address;
  }
};

export default getUsdcAddress;
