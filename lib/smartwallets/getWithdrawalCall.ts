import { Address } from "viem";
import { encodeFunctionData, erc20Abi } from "viem";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";
import getUsdcAddress from "@/lib/usdc/getUsdcAddress";

export function getWithdrawalCall(
  currency: "eth" | "usdc",
  amount: bigint,
  to: Address,
  chainId: number
): Call {
  if (currency === "eth") {
    // ETH transfer - simple value transfer
    return {
      to,
      value: amount,
    };
  } else {
    // USDC transfer - ERC20 transfer call
    const usdcAddress = getUsdcAddress(chainId);
    return {
      to: usdcAddress,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [to, amount],
      }),
    };
  }
}
