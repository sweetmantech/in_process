import { CHAIN, CHAIN_ID, MULTICALL3_ADDRESS } from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import { parseEther } from "viem";
import useSignedAddress from "./useSignedAddress";
import { Address } from "viem";
import { SaleConfig } from "./useTokenSaleConfig";
import useUsdc from "./useUsdc";
import { toast } from "sonner";
import getCollectRequest from "@/lib/getCollectRequest";
import { TokenInfo } from "@/types/token";
import useSignTransaction from "./useSignTransaction";
import getPoolInfo from "@/lib/uniswap/getPoolInfo";
import useBalance from "./useBalance";
import { multicall3ABI } from "@/lib/abis/multicall3ABI";
import getSwapAndMintMulticallCalls from "@/lib/calls/getSwapAndMintMuticallCalls";

const useUsdcMint = () => {
  const signedAddress = useSignedAddress();
  const { hasAllowance, approve } = useUsdc();
  const { signTransaction } = useSignTransaction();
  const balances = useBalance();

  const mintWithUsdc = async (
    sale: SaleConfig,
    token: TokenInfo,
    comment: string,
  ) => {
    const usdcPrice = sale.pricePerToken;
    const hasSufficientUsdc = balances.usdcBalance >= usdcPrice;
    const publicClient = getPublicClient(CHAIN_ID);
    if (hasSufficientUsdc) {
      const sufficientAllowance = await hasAllowance(sale);
      if (!sufficientAllowance) {
        toast.error(
          `Insufficient allowance. please sign initial tx to grant max allowance`,
        );
        await approve();
      }
      const request = getCollectRequest(
        token,
        sale,
        signedAddress as Address,
        comment,
      );
      if (!request) throw new Error();
      const hash = await signTransaction(request);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    }

    const { amountInMaximum, liquidity, gasEstimate } = await getPoolInfo(
      signedAddress as Address,
      usdcPrice,
    );
    const ethBalance = parseEther(balances.ethBalance.toString());
    if (ethBalance > amountInMaximum) {
      const calls = getSwapAndMintMulticallCalls(
        signedAddress as Address,
        token.token.contract.address,
        BigInt(token.token.tokenId),
        comment,
        usdcPrice,
        amountInMaximum,
        liquidity,
      );
      const hash = await signTransaction({
        address: MULTICALL3_ADDRESS,
        abi: multicall3ABI as any,
        functionName: "aggregate3Value",
        args: [calls],
        account: signedAddress as Address,
        value: amountInMaximum,
        chain: CHAIN,
        gasPrice: gasEstimate,
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    }

    return false;
  };

  return {
    mintWithUsdc,
  };
};

export default useUsdcMint;
