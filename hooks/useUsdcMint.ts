import { formatUnits } from "viem";
import { SaleConfig } from "./useTokenInfo";
import { TokenInfo } from "@/types/token";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

const useUsdcMint = () => {
  const { balance } = useSmartWalletProvider();
  const { artistWallet } = useUserProvider();

  const mintWithUsdc = async (
    sale: SaleConfig,
    token: TokenInfo,
    comment: string,
    mintCount: number = 1
  ) => {
    try {
      const usdcPrice = formatUnits(sale.pricePerToken, 6);
      if (Number(balance) < Number(usdcPrice)) {
        throw new Error(
          "Insufficient balance. please topup USDC to your smart wallet. \n https://inprocess.fun/topup"
        );
      }
      const response = await fetch("/api/moment/collect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: {
            tokenContractAddress: token.tokenContractAddress,
            tokenId: token.tokenId,
          },
          account: artistWallet,
          amount: mintCount,
          comment,
        }),
      });
      const data = await response.json();
      return data.hash;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    mintWithUsdc,
  };
};

export default useUsdcMint;
