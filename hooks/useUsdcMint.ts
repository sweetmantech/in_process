import {
  CHAIN,
  CHAIN_ID,
  ETH_USDC_WRAPPER,
  UNISWAP_ROUTER_ADDRESS,
} from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import { parseEther } from "viem";
import useSignedAddress from "./useSignedAddress";
import { Address } from "viem";
import { SaleConfig } from "./useTokenInfo";
import useUsdc from "./useUsdc";
import { toast } from "sonner";
import getCollectRequest from "@/lib/getCollectRequest";
import { TokenInfo } from "@/types/token";
import useSignTransaction from "./useSignTransaction";
import getPoolInfo from "@/lib/uniswap/getPoolInfo";
import useBalance from "./useBalance";
import { QUOTER_ADDRESSES, V3_CORE_FACTORY_ADDRESSES } from "@uniswap/sdk-core";
import { USDC_TOKEN, WETH_TOKEN } from "@/lib/tokens";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import { wrapperABI } from "@/lib/abis/wrapperABI";

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

    const { amountInMaximum } = await getPoolInfo(
      signedAddress as Address,
      usdcPrice,
    );
    const ethBalance = parseEther(balances.ethBalance.toString());
    if (ethBalance > amountInMaximum) {
      const hash = await signTransaction({
        address: ETH_USDC_WRAPPER,
        abi: wrapperABI as any,
        functionName: "mint",
        args: [
          V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
          UNISWAP_ROUTER_ADDRESS,
          QUOTER_ADDRESSES[CHAIN_ID],
          WETH_TOKEN.address,
          USDC_TOKEN.address,
          500,
          usdcPrice,
          erc20MinterAddresses[CHAIN_ID],
          token.tokenContractAddress,
          token.tokenId,
          1,
          comment,
        ],
        account: signedAddress as Address,
        value: amountInMaximum,
        chain: CHAIN,
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
