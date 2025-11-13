import { Address, formatUnits, Hash, zeroAddress } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET, USDC_ADDRESS } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { collectSchema } from "../schema/collectSchema";
import getTokenInfo from "../viem/getTokenInfo";
import getUsdcBalance from "../balance/getUsdcBalance";
import getEthBalance from "../balance/getEthBalance";
import getAllowance from "../viem/getAllowance";
import { erc20MinterAddresses } from "../protocolSdk/constants";
import { distributeSplitFunds } from "../splits/distributeSplitFunds";
import isSplitContract from "../splits/isSplitContract";
import { MintType } from "@/types/zora";
import getCollectCall, { CollectCall } from "../getCollectCall";
import getApproveCall from "../getApproveCall";

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
  const { saleConfig, owner } = await getTokenInfo(
    moment.contractAddress as Address,
    moment.tokenId,
    CHAIN_ID
  );

  const isErc20Mint = saleConfig.type === MintType.ZoraErc20Mint;
  const approveCall: CollectCall[] = [];

  // Validate balance and check allowance for USDC mints
  if (isErc20Mint) {
    const pricePerToken = formatUnits(saleConfig.pricePerToken, 6);
    const balance = await getUsdcBalance(smartAccount.address);
    const totalPrice = Number(pricePerToken) * amount;
    if (totalPrice > Number(balance)) throw Error("Insufficient balance.");

    // Check allowance of erc20Minter - approve if insufficient
    const allowance: string = await getAllowance(
      smartAccount.address,
      erc20MinterAddresses[CHAIN_ID]
    );
    if (Number(allowance) < totalPrice) {
      approveCall.push(getApproveCall(totalPrice));
    }
  } else {
    // Validate ETH balance for ETH mints
    const ethBalanceWei: bigint = await getEthBalance(smartAccount.address);
    const totalPriceWei = saleConfig.pricePerToken * BigInt(amount);
    if (totalPriceWei > ethBalanceWei) throw Error("Insufficient balance.");
  }

  // Get the collect call using the shared function
  const collectCall = getCollectCall(
    moment.contractAddress as Address,
    Number(moment.tokenId),
    saleConfig,
    artistAddress,
    comment,
    amount
  );

  const calls = [...approveCall, collectCall] as const;
  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: calls as any,
  });

  // Distribute funds from split contract if fundsRecipient is a split
  if (saleConfig.fundsRecipient) {
    const isSplit = await isSplitContract(saleConfig.fundsRecipient as Address, CHAIN_ID);
    if (isSplit) {
      await distributeSplitFunds({
        splitAddress: saleConfig.fundsRecipient,
        tokenAddress: isErc20Mint ? USDC_ADDRESS : zeroAddress, // zeroAddress for native ETH
        distributorAddress: owner,
      });
    }
  }

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
