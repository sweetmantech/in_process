import { Address, encodeFunctionData } from "viem";
import { swapRouter02ABI } from "../abis/uniswap/swapRouter02ABI";
import { FeeAmount } from "@uniswap/v3-sdk";

const getSwapCall = (
  tokenIn: Address,
  tokenOut: Address,
  recipient: Address,
  amountOut: bigint,
  amountInMaximum: bigint,
  sqrtPriceLimitX96: bigint,
) => {
  const swapCall = encodeFunctionData({
    functionName: "exactOutputSingle",
    args: [
      {
        tokenIn,
        tokenOut,
        fee: FeeAmount.LOW,
        recipient,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        amountOut,
        amountInMaximum,
        sqrtPriceLimitX96,
      },
    ],
    abi: swapRouter02ABI as any,
  });

  return swapCall;
};

export default getSwapCall;
