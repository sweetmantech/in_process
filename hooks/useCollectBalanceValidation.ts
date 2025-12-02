import { MomentSaleConfig, MomentType } from "@/types/moment";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";
import { formatUnits } from "viem";

const useCollectBalanceValidation = () => {
  const { balance, ethBalance } = useSmartWalletProvider();

  const validateBalance = (saleConfig: MomentSaleConfig, mintCount: number = 1): void => {
    const isErc20Mint = saleConfig.type === MomentType.Erc20Mint;
    const totalPrice = Number(
      formatUnits(BigInt(saleConfig.pricePerToken) * BigInt(mintCount), isErc20Mint ? 6 : 18)
    );
    if (isErc20Mint) {
      if (Number(balance) < totalPrice) {
        showInsufficientBalanceError("usdc");
      }
    } else {
      if (Number(ethBalance) < totalPrice) {
        showInsufficientBalanceError("eth");
      }
    }
  };

  return {
    validateBalance,
  };
};

export default useCollectBalanceValidation;
