import { MintType } from "@/types/zora";

const getSaleConfigType = (value: "erc20Mint" | "timed" | "fixedPrice") => {
  if (value === "erc20Mint") return MintType.Erc20Mint;
  if (value === "timed") return MintType.TimedMint;
  return MintType.FixedPriceMint;
};

export default getSaleConfigType;
