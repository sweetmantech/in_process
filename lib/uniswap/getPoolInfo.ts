import { QUOTER_ADDRESSES, V3_CORE_FACTORY_ADDRESSES } from "@uniswap/sdk-core";
import { computePoolAddress, FeeAmount } from "@uniswap/v3-sdk";
import { CHAIN_ID } from "../consts";
import { USDC_TOKEN, WETH_TOKEN } from "../tokens";
import { getPublicClient } from "../viem/publicClient";
import { v3UniswapPoolABI } from "../abis/uniswap/v2UniswapPoolABI";
import { Address } from "viem";
import { quoteV2ABI } from "../abis/uniswap/quoteV2ABI";

const getPoolInfo = async (account: Address, swapAmount: bigint) => {
  const poolAddress = computePoolAddress({
    factoryAddress: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
    tokenA: WETH_TOKEN,
    tokenB: USDC_TOKEN,
    fee: FeeAmount.LOW,
  });

  const publicClient = getPublicClient(CHAIN_ID);
  const poolCalls = [
    "token0",
    "token1",
    "fee",
    "tickSpacing",
    "liquidity",
    "slot0",
  ].map((functionName: string) => ({
    address: poolAddress,
    abi: v3UniswapPoolABI,
    functionName,
  }));

  const returnValues: any = await publicClient.multicall({
    contracts: poolCalls as any,
  });

  const tokenIn = returnValues[0].result;
  const tokenOut = returnValues[1].result;
  const fee = returnValues[2].result;
  const liquidity = returnValues[4].result;

  const { result } = await publicClient.simulateContract({
    address: QUOTER_ADDRESSES[CHAIN_ID] as Address,
    abi: quoteV2ABI,
    functionName: "quoteExactOutputSingle",
    args: [
      {
        tokenIn,
        tokenOut,
        amount: swapAmount,
        fee: fee.toString(),
        sqrtPriceLimitX96: liquidity.toString(),
      },
    ],
    account,
  });

  const gasEstimate = result[3] as bigint;
  const swapVolatility = BigInt(10) / BigInt(100);
  const amountInMaximum = (result[0] as bigint) + gasEstimate;

  return {
    tokenIn,
    tokenOut,
    fee,
    liquidity,
    amountInMaximum: amountInMaximum + amountInMaximum * swapVolatility,
    gasEstimate,
  };
};

export default getPoolInfo;
