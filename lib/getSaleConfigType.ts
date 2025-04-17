import { MintType } from "@/types/zora";

const getSaleConfigType = (value: "erc20Mint" | "timed" | "fixedPrice") => {
  if (value === "erc20Mint") return MintType.ZoraErc20Mint;
  if (value === "timed") return MintType.ZoraTimedMint;
  return MintType.ZoraFixedPriceMint;
};

export default getSaleConfigType;
