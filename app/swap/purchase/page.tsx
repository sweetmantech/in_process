"use client";

import useBalance from "@/hooks/useBalance";
import { Address, parseEther, parseUnits } from "viem";
import { CHAIN, CHAIN_ID, MULTICALL3_ADDRESS } from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import useSignedAddress from "@/hooks/useSignedAddress";
import useSignTransaction from "@/hooks/useSignTransaction";
import { useState } from "react";
import { USDC_TOKEN } from "@/lib/tokens";
import { multicall3ABI } from "@/lib/abis/multicall3ABI";
import { toast } from "sonner";
import getSwapAndMintMulticallCalls from "@/lib/calls/getSwapAndMintMuticallCalls";
import getPoolInfo from "@/lib/uniswap/getPoolInfo";

const Swap = () => {
  const balances = useBalance();
  const signedAddress = useSignedAddress();
  const { signTransaction } = useSignTransaction();
  const amount = "1";
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [transactionLink, setTransactionLink] = useState("");

  const onPurchase = async () => {
    try {
      setLoading(true);
      const collectionAddress = "0x1590252D59F9DB3af56860b864CB49C97eF35ba9";
      const usdcPrice = parseUnits(amount, USDC_TOKEN.decimals);
      const { amountInMaximum, liquidity } = await getPoolInfo(
        signedAddress as Address,
        usdcPrice,
      );
      const ethBalance = parseEther(balances.ethBalance.toString());
      if (ethBalance < amountInMaximum) {
        toast.error("insufficient amount");
        setLoading(false);
        return;
      }
      const calls = getSwapAndMintMulticallCalls(
        signedAddress as Address,
        collectionAddress,
        BigInt(1),
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
      });
      const publicClient = getPublicClient(CHAIN_ID);
      await publicClient.waitForTransactionReceipt({ hash });
      setTransactionLink(`https://basescan.org/tx/${hash}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="grow flex flex-col justify-center items-center gap-2">
      <p className="font-archivo text-lg">chain: Base - 8453</p>
      <p className="font-archivo text-lg">
        collection address: 0x1590252D59F9DB3af56860b864CB49C97eF35ba9
      </p>
      <p className="font-archivo text-lg">token id: 1</p>
      <p className="font-archivo text-lg">price: 1 USDC</p>
      {transactionLink && <p>Transaction: {transactionLink}</p>}
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
