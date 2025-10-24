import { Address, encodeFunctionData, erc20Abi, formatUnits, Hash, parseUnits } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET, USDC_ADDRESS } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { erc20MinterABI } from "@zoralabs/protocol-deployments";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { collectSchema } from "../schema/collectSchema";
import getTokenInfo from "../viem/getTokenInfo";
import getBalance from "../viem/getBalance";
import getAllowance from "../viem/getAllowance";
import { erc20MinterAddresses } from "../protocolSdk/constants";

export type CollectMomentInput = z.infer<typeof collectSchema> & { artistAddress: Address };

export interface CollectResult {
  hash: Hash;
  chainId: number;
}

/**
 * Collect a In Process 1155 token using a smart account via Coinbase CDP.
 * Accepts the full API input shape to collect a Moment.
 */
export async function collectMoment({
  moment,
  comment,
  amount,
  artistAddress,
}: CollectMomentInput): Promise<CollectResult> {
  // Get or create a smart account (contract wallet)
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  // Check smart wallet balance
  const { saleConfig } = await getTokenInfo(
    moment.contractAddress as Address,
    moment.tokenId,
    CHAIN_ID
  );
  const pricePerToken = formatUnits(saleConfig.pricePerToken, 6);
  const balance = await getBalance(smartAccount.address);
  const totalPrice = Number(pricePerToken) * amount;
  if (totalPrice > Number(balance)) throw Error("Insufficient balance.");

  // Check allowance of erc20Minter
  const approveCall: any = [];
  const allowance = await getAllowance(smartAccount.address, erc20MinterAddresses[CHAIN_ID]);
  if (Number(allowance) < totalPrice) {
    approveCall.push({
      to: USDC_ADDRESS,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: "approve",
        args: [erc20MinterAddresses[CHAIN_ID], parseUnits(totalPrice.toString(), 6)],
      }),
    });
  }

  const collectCall = {
    to: erc20MinterAddresses[CHAIN_ID],
    data: encodeFunctionData({
      abi: erc20MinterABI,
      functionName: "mint",
      args: [
        artistAddress,
        BigInt(amount),
        moment.contractAddress as Address,
        BigInt(moment.tokenId),
        parseUnits(totalPrice.toString(), 6),
        USDC_ADDRESS,
        artistAddress,
        comment,
      ],
    }),
  };

  const calls = [...approveCall, collectCall];
  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls,
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
