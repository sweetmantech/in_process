import { MomentSaleConfig, MomentType } from "@/types/moment";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";
import { formatUnits } from "viem";
import { Currency } from "@/types/balances";

export interface BalanceCheckResult {
  sufficient: boolean;
  currency: Currency;
  shortfall: number; // exact amount needed to cover the cost
}

const useCollectBalanceValidation = () => {
  const { balance, ethBalance } = useSmartWalletProvider();

  const checkBalance = (
    saleConfig: MomentSaleConfig,
    mintCount: number = 1
  ): BalanceCheckResult => {
    const isErc20Mint = saleConfig.type === MomentType.Erc20Mint;
    const currency: Currency = isErc20Mint ? "usdc" : "eth";
    const totalPrice = Number(
      formatUnits(BigInt(saleConfig.pricePerToken) * BigInt(mintCount), isErc20Mint ? 6 : 18)
    );
    const current = Number(isErc20Mint ? balance : ethBalance);
    return {
      sufficient: current >= totalPrice,
      currency,
      shortfall: Math.max(0, totalPrice - current),
    };
  };

  return {
    checkBalance,
  };
};

export default useCollectBalanceValidation;
