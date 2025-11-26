import { MintType } from "@/types/legacy/zora";

const getPriceUnit = (type: string | undefined) => {
  if (!type) return "";
  return type === MintType.Erc20Mint ? "usdc" : "eth";
};

export default getPriceUnit;
