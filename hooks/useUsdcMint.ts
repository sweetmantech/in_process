import { CHAIN, CHAIN_ID, ETH_USDC_WRAPPER, UNISWAP_ROUTER_ADDRESS } from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import { formatUnits, parseEther } from "viem";
import { Address } from "viem";
import { SaleConfig } from "./useTokenInfo";
import useUsdc from "./useUsdc";
import { toast } from "sonner";
import getCollectRequest from "@/lib/getCollectRequest";
import { TokenInfo } from "@/types/token";
import useSignTransaction from "./useSignTransaction";
import getPoolInfo from "@/lib/uniswap/getPoolInfo";
import { QUOTER_ADDRESSES, V3_CORE_FACTORY_ADDRESSES } from "@uniswap/sdk-core";
import { USDC_TOKEN, WETH_TOKEN } from "@/lib/tokens";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import { wrapperABI } from "@/lib/abis/wrapperABI";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

const useUsdcMint = () => {
  const { hasAllowance, approve } = useUsdc();
  const { signTransaction } = useSignTransaction();
  const { balance } = useSmartWalletProvider()

  const mintWithUsdc = async (
    sale: SaleConfig,
    token: TokenInfo,
    comment: string,
    mintCount: number = 1
  ) => {
    const usdcPrice = formatUnits(sale.pricePerToken, 6);
    if (Number(balance) < Number(usdcPrice)) {
      toast.error(`Insufficient balance. please topup USDC to your smart wallet.`);
    }
    // const hasSufficientUsdc = balances.usdcBalance >= usdcPrice * BigInt(mintCount);

    // const publicClient = getPublicClient(CHAIN_ID);
    // if (hasSufficientUsdc) {
    //   const sufficientAllowance = await hasAllowance(sale, mintCount);
    //   if (!sufficientAllowance) {
    //     toast.error(`Insufficient allowance. please sign initial tx to grant max allowance`);
    //     await approve(usdcPrice * BigInt(mintCount));
    //   }
    //   const request = getCollectRequest(
    //     token,
    //     sale,
    //     connectedAddress as Address,
    //     comment,
    //     mintCount
    //   );
    //   if (!request) throw new Error();
    //   const hash = await signTransaction(request);
    //   const receipt = await publicClient.waitForTransactionReceipt({ hash });
    //   return receipt;
    // }

    // const { amountInMaximum } = await getPoolInfo(connectedAddress as Address, usdcPrice);
    // const ethBalance = parseEther(balances.ethBalance.toString());
    // if (ethBalance > amountInMaximum) {
    //   const hash = await signTransaction({
    //     address: ETH_USDC_WRAPPER,
    //     abi: wrapperABI as any,
    //     functionName: "mint",
    //     args: [
    //       V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
    //       UNISWAP_ROUTER_ADDRESS,
    //       QUOTER_ADDRESSES[CHAIN_ID],
    //       WETH_TOKEN.address,
    //       USDC_TOKEN.address,
    //       500,
    //       usdcPrice,
    //       erc20MinterAddresses[CHAIN_ID],
    //       token.tokenContractAddress,
    //       token.tokenId,
    //       mintCount,
    //       comment,
    //     ],
    //     account: connectedAddress as Address,
    //     value: amountInMaximum,
    //     chain: CHAIN,
    //   });
    //   const receipt = await publicClient.waitForTransactionReceipt({ hash });
    //   return receipt;
    // }

    // return false;
  };

  return {
    mintWithUsdc,
  };
};

export default useUsdcMint;
