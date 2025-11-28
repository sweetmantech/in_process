import { MomentType } from "@/types/moment";

const getSaleConfigType = (value: "erc20Mint" | "timed" | "fixedPrice") => {
  if (value === "erc20Mint") return MomentType.Erc20Mint;
  if (value === "timed") return MomentType.TimedMint;
  return MomentType.FixedPriceMint;
};

export default getSaleConfigType;
