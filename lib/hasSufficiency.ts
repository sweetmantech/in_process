import { SaleConfig } from "@/hooks/useTokenSaleConfig";
import { Balances } from "@/types/balances";
import { MintType } from "@/types/zora";
import { formatEther, formatUnits } from "viem";

const hasSufficiency = (sale: SaleConfig | undefined, balances: Balances) => {
  if (!sale) return false;

  if (sale.type === MintType.ZoraErc20Mint) {
    const price = parseFloat(formatUnits(sale.pricePerToken, 6));
    return balances.usdcBalance > price;
  }

  if (sale.type === MintType.ZoraFixedPriceMint) {
    const price = parseFloat(formatEther(sale.pricePerToken));
    return balances.ethBalance > price;
  }

  return false;
};

export default hasSufficiency;
