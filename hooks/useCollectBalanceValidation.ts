import { formatEther, formatUnits } from "viem";
import { MintType } from "@/types/zora";
import { SaleConfig } from "./useTokenInfo";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";

const useCollectBalanceValidation = () => {
  const { balance, ethBalance } = useSmartWalletProvider();

  const validateBalance = (saleConfig: SaleConfig, amountToCollect: number = 1): void => {
    const ethPrice = formatEther(saleConfig.pricePerToken * BigInt(amountToCollect));
    const usdcPrice = formatUnits(saleConfig.pricePerToken * BigInt(amountToCollect), 6);

    if (saleConfig.type === MintType.ZoraErc20Mint) {
      if (Number(balance) < Number(usdcPrice)) {
        showInsufficientBalanceError("usdc");
      }
    } else {
      if (Number(ethBalance) < Number(ethPrice)) {
        showInsufficientBalanceError("eth");
      }
    }
  };

  return {
    validateBalance,
  };
};

export default useCollectBalanceValidation;
