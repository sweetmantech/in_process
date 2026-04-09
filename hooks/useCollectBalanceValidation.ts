import { MomentSaleConfig, MomentType } from "@/types/moment";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";
import { parseEther, parseUnits } from "viem";
import { Currency } from "@/types/balances";

export interface BalanceCheckResult {
  sufficient: boolean;
  currency: Currency;
  shortfall: bigint; // base-unit shortfall (wei for ETH, 6-decimal units for USDC)
}

const useCollectBalanceValidation = () => {
  const { balance, ethBalance } = useSmartWalletProvider();

  const checkBalance = (
    saleConfig: MomentSaleConfig,
    mintCount: number = 1
  ): BalanceCheckResult => {
    const isErc20Mint = saleConfig.type === MomentType.Erc20Mint;
    const currency: Currency = isErc20Mint ? "usdc" : "eth";

    const totalPriceBase = BigInt(saleConfig.pricePerToken) * BigInt(mintCount);
    // Parse formatted strings back to bigint — lossless for stored precision (6 dp USDC, 18 dp ETH)
    const currentBase = isErc20Mint ? parseUnits(balance, 6) : parseEther(ethBalance);

    return {
      sufficient: currentBase >= totalPriceBase,
      currency,
      shortfall: totalPriceBase > currentBase ? totalPriceBase - currentBase : BigInt(0),
    };
  };

  return {
    checkBalance,
  };
};

export default useCollectBalanceValidation;
