import { formatUnits } from "viem";
import { SaleConfig } from "./useTokenInfo";
import { TokenInfo } from "@/types/token";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { collectMomentApi } from "@/lib/moment/collectMomentApi";

const useUsdcMint = () => {
  const { balance } = useSmartWalletProvider();
  const { getAccessToken } = usePrivy();
  const collectWithUsdc = async (
    sale: SaleConfig,
    token: TokenInfo,
    comment: string,
    mintCount: number = 1
  ) => {
    const usdcPrice = formatUnits(sale.pricePerToken, 6);
    if (Number(balance) < Number(usdcPrice)) {
      toast.error("Insufficient balance. Please add funds to collect.", {
        action: {
          label: "Topup",
          onClick: () => {
            window.open("https://inprocess.fun/topup", "_blank");
          },
        },
      });
      throw new Error("Insufficient balance. Please add funds to collect.");
    }
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Failed to get access token");
    }
    const hash = await collectMomentApi(
      {
        contractAddress: token.tokenContractAddress,
        tokenId: token.tokenId,
      },
      mintCount,
      comment,
      accessToken
    );
    return hash;
  };

  return {
    collectWithUsdc,
  };
};

export default useUsdcMint;
