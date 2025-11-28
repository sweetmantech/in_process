import { MomentType } from "@/types/moment";

const getPriceUnit = (type: string | undefined) => {
  if (!type) return "";
  return type === MomentType.Erc20Mint ? "usdc" : "eth";
};

export default getPriceUnit;
