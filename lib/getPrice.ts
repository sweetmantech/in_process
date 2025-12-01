import { MomentType } from "@/types/moment";
import { formatUnits } from "viem";

const getPrice = (pricePerToken: bigint | number | string, type: string | undefined) => {
  if (!type) return "";
  return formatUnits(BigInt(pricePerToken), type === MomentType.Erc20Mint ? 6 : 18);
};

export default getPrice;
