import { MintType } from "@/types/zora";
import { formatUnits } from "viem";

const getPrice = (
  pricePerToken: bigint | number | string,
  type: string | undefined,
) => {
  if (!type) return "";
  return formatUnits(
    BigInt(pricePerToken),
    type === MintType.ZoraErc20Mint ? 6 : 18,
  );
};

export default getPrice;
