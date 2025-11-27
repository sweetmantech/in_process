import { formatEther, formatUnits } from "viem";
import { MomentType } from "@/types/moment";
import { SaleConfig } from "@/types/moment";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";

const useCollectBalanceValidation = () => {
  const { balance, ethBalance } = useSmartWalletProvider();

  const validateBalance = (saleConfig: SaleConfig, mintCount: number = 1): void => {
    const ethPrice = formatEther(saleConfig.pricePerToken * BigInt(mintCount));
    const usdcPrice = formatUnits(saleConfig.pricePerToken * BigInt(mintCount), 6);

    if (saleConfig.type === MomentType.Erc20Mint) {
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
