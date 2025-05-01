"use client";

import useBalance from "@/hooks/useBalance";
import { Address, parseUnits } from "viem";
import { CHAIN, CHAIN_ID, UNISWAP_ROUTER_ADDRESS } from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import useSignedAddress from "@/hooks/useSignedAddress";
import useSignTransaction from "@/hooks/useSignTransaction";
import { useState } from "react";
import { USDC_TOKEN, WETH_TOKEN } from "@/lib/tokens";
import { toast } from "sonner";
import getPoolInfo from "@/lib/uniswap/getPoolInfo";
import { wrapperABI } from "@/lib/abis/wrapperABI";
import { QUOTER_ADDRESSES, V3_CORE_FACTORY_ADDRESSES } from "@uniswap/sdk-core";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import { ETH_USDC_WRAPPER } from "../../../lib/consts";

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
      const { amountInMaximum } = await getPoolInfo(
        signedAddress as Address,
        usdcPrice,
      );
      const ethBalance = balances.ethBalance;
      if (ethBalance < amountInMaximum) {
        toast.error("insufficient amount");
        setLoading(false);
        return;
      }
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
          collectionAddress,
          1,
          1,
          comment,
        ],
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
      {transactionLink && (
        <p className="font-archivo text-lg text-center">
          Transaction: <br />
          {transactionLink}
        </p>
      )}
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
