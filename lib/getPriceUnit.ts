import { MintType } from "@/types/zora";

const getPriceUnit = (type: string | undefined) => {
  if (!type) return "";
  return type === MintType.ZoraErc20Mint ? "usdc" : "eth";
};

export default getPriceUnit;
