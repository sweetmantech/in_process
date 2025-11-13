import { Address, Hash, OneOf, zeroAddress } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET, USDC_ADDRESS } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { collectSchema } from "../schema/collectSchema";
import getTokenInfo from "../viem/getTokenInfo";
import { distributeSplitFunds } from "../splits/distributeSplitFunds";
import isSplitContract from "../splits/isSplitContract";
import { MintType } from "@/types/zora";
import getCollectCall from "../viem/getCollectCall";
import { validateBalanceAndAllowance } from "./validateBalanceAndAllowance";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";

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

  // Get token info and sale config
  const { saleConfig } = await getTokenInfo(
    moment.contractAddress as Address,
    moment.tokenId,
    CHAIN_ID
  );

  const approveCall = await validateBalanceAndAllowance(smartAccount.address, saleConfig, amount);

  // Get the collect call using the shared function
  const collectCall = getCollectCall(
    moment.contractAddress as Address,
    Number(moment.tokenId),
    saleConfig,
    artistAddress,
    comment,
    amount
  );

  const calls = [...approveCall, collectCall] as readonly OneOf<
    Call<unknown, { [key: string]: unknown }>
  >[];
  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls,
  });

  // Distribute funds from split contract if fundsRecipient is a split
  if (saleConfig.fundsRecipient) {
    const isSplit = await isSplitContract(saleConfig.fundsRecipient as Address, CHAIN_ID);
    if (isSplit) {
      await distributeSplitFunds({
        splitAddress: saleConfig.fundsRecipient,
        tokenAddress: saleConfig.type === MintType.ZoraErc20Mint ? USDC_ADDRESS : zeroAddress, // zeroAddress for native ETH
        smartAccount,
      });
    }
  }

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
