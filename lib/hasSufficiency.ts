import { SaleConfig } from "@/hooks/useTokenSaleConfig";
import { Balances } from "@/types/balances";
import { MintType } from "@/types/zora";
import { erc20Abi, formatEther, formatUnits, Address } from "viem";
import { getPublicClient } from "./viem/publicClient";
import { CHAIN_ID, USDC_ADDRESS } from "./consts";

const hasSufficiency = async (
  connectedAddress: Address,
  sale: SaleConfig | undefined,
  balances: Balances,
) => {
  if (!sale) return false;

  if (sale.type === MintType.ZoraErc20Mint) {
    const publicClient = getPublicClient(CHAIN_ID);
    const data = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [connectedAddress],
    });
    const price = parseFloat(formatUnits(sale.pricePerToken, 6));
    return parseFloat(formatUnits(data, 6)) > price;
  }

  if (sale.type === MintType.ZoraFixedPriceMint) {
    const price = parseFloat(formatEther(sale.pricePerToken));
    return balances.ethBalance > price;
  }

  return false;
};

export default hasSufficiency;
