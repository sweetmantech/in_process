"use client";

import useBalance from "@/hooks/useBalance";
import { QUOTER_ADDRESSES, V3_CORE_FACTORY_ADDRESSES } from "@uniswap/sdk-core";
import { computePoolAddress, FeeAmount } from "@uniswap/v3-sdk";
import {
  Address,
  encodeFunctionData,
  erc20Abi,
  maxUint256,
  parseEther,
  parseUnits,
} from "viem";
import {
  CHAIN,
  CHAIN_ID,
  MULTICALL3_ADDRESS,
  UNISWAP_ROUTER_ADDRESS,
} from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import useSignedAddress from "@/hooks/useSignedAddress";
import useSignTransaction from "@/hooks/useSignTransaction";
import { useState } from "react";
import { USDC_TOKEN, WETH_TOKEN } from "@/lib/tokens";
import { quoteV2ABI } from "@/lib/abis/uniswap/quoteV2ABI";
import { wethABI } from "@/lib/abis/wethABI";
import { swapRouter02ABI } from "@/lib/abis/uniswap/swapRouter02ABI";
import { v3UniswapPoolABI } from "@/lib/abis/uniswap/v2UniswapPoolABI";
import { multicall3ABI } from "@/lib/abis/multicall3ABI";
import { toast } from "sonner";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import { erc20MinterABI } from "@zoralabs/protocol-deployments";

const Swap = () => {
  const balances = useBalance();
  const signedAddress = useSignedAddress();
  const { signTransaction } = useSignTransaction();
  const amount = "1";
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const onPurchase = async () => {
    try {
      setLoading(true);
      const swapAmount = parseUnits(amount, USDC_TOKEN.decimals);
      const poolAddress = computePoolAddress({
        factoryAddress: V3_CORE_FACTORY_ADDRESSES[CHAIN.id],
        tokenA: WETH_TOKEN,
        tokenB: USDC_TOKEN,
        fee: FeeAmount.LOW,
      });
      const publicClient = getPublicClient(CHAIN.id);

      const poolCalls = [
        {
          address: poolAddress,
          abi: v3UniswapPoolABI,
          functionName: "token0",
        },
        {
          address: poolAddress,
          abi: v3UniswapPoolABI,
          functionName: "token1",
        },
        {
          address: poolAddress,
          abi: v3UniswapPoolABI,
          functionName: "fee",
        },
        {
          address: poolAddress,
          abi: v3UniswapPoolABI,
          functionName: "tickSpacing",
        },
        {
          address: poolAddress,
          abi: v3UniswapPoolABI,
          functionName: "liquidity",
        },
        {
          address: poolAddress,
          abi: v3UniswapPoolABI,
          functionName: "slot0",
        },
      ];

      const returnValues: any = await publicClient.multicall({
        contracts: poolCalls as any,
      });

      const tokenIn = returnValues[0].result;
      const tokenOut = returnValues[1].result;
      const fee = returnValues[2].result;
      const liquidity = returnValues[4].result;

      const { result } = await publicClient.simulateContract({
        address: QUOTER_ADDRESSES[CHAIN.id] as Address,
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
        account: signedAddress as Address,
      });

      const amountInMaximum = (result[0] as bigint) + (result[3] as bigint); // 1st: exact amount in 2nd: estimated gas fee
      const ethBalance = parseEther(balances.ethBalance.toString());
      if (ethBalance < amountInMaximum) {
        toast.error("insufficient amount");
        setLoading(false);
        return;
      }
      const wethApprovalCall = encodeFunctionData({
        functionName: "approve",
        args: [UNISWAP_ROUTER_ADDRESS, amountInMaximum],
        abi: wethABI as any,
      });
      const swapCall = encodeFunctionData({
        functionName: "exactOutputSingle",
        args: [
          {
            tokenIn: WETH_TOKEN.address,
            tokenOut: USDC_TOKEN.address,
            fee: 500,
            recipient: MULTICALL3_ADDRESS,
            deadline: Math.floor(Date.now() / 1000) + 60 * 20,
            amountOut: swapAmount,
            amountInMaximum: amountInMaximum,
            sqrtPriceLimitX96: liquidity,
          },
        ],
        abi: swapRouter02ABI as any,
      });
      const usdcApproveCall = encodeFunctionData({
        functionName: "approve",
        args: [erc20MinterAddresses[CHAIN_ID], maxUint256],
        abi: erc20Abi as any,
      });
      const mintCall = encodeFunctionData({
        abi: erc20MinterABI,
        functionName: "mint",
        args: [
          signedAddress as Address,
          BigInt(1),
          "0x1590252D59F9DB3af56860b864CB49C97eF35ba9",
          BigInt(1),
          swapAmount,
          USDC_TOKEN.address as Address,
          signedAddress as Address,
          comment,
        ],
      });
      const calls = [
        {
          target: WETH_TOKEN.address as Address,
          value: BigInt(0),
          callData: wethApprovalCall,
          allowFailure: false,
        },
        {
          target: UNISWAP_ROUTER_ADDRESS,
          value: amountInMaximum,
          callData: swapCall,
          allowFailure: false,
        },
        {
          target: USDC_TOKEN.address,
          value: BigInt(0),
          callData: usdcApproveCall,
          allowFailure: false,
        },
        {
          target: erc20MinterAddresses[CHAIN_ID] as Address,
          value: BigInt(0),
          callData: mintCall,
          allowFailure: false,
        },
      ];
      await signTransaction({
        address: MULTICALL3_ADDRESS,
        abi: multicall3ABI as any,
        functionName: "aggregate3Value",
        args: [calls],
        account: signedAddress as Address,
        value: amountInMaximum,
        chain: CHAIN,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="grow flex flex-col justify-center items-center gap-2">
      <p className="font-archivo text-lg">
        collection: 0x1590252D59F9DB3af56860b864CB49C97eF35ba9
      </p>
      <p className="font-archivo text-lg">token id: 1</p>
      <p className="font-archivo text-lg">price: 1 USDC</p>
      <input
        type="text"
        value={comment}
        className="font-archivo p-2 rounded-md"
        onChange={(e) => setComment(e.target.value)}
        placeholder="enter comment"
      />
      <button
        className="bg-black font-archivo text-white py-2 px-6 rounded-md disabled:bg-grey-moss-300 disabled:cursor-not-allowed"
        onClick={onPurchase}
        disabled={loading}
      >
        {loading ? "Purchasing..." : "Purchase"}
      </button>
    </div>
  );
};

export default Swap;
