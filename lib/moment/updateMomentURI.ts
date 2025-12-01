import { Address, Hash } from "viem";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import getUpdateTokenURICall from "@/lib/viem/getUpdateTokenURICall";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { Moment } from "@/types/moment";

export interface UpdateMomentURIInput {
  moment: Moment;
  newUri: string;
  artistAddress: Address;
}

export interface UpdateMomentURIResult {
  hash: Hash;
  chainId: number;
}

/**
 * Updates moment URI using a smart account via Coinbase CDP.
 * Handles the transaction on the backend side.
 */
export async function updateMomentURI({
  moment,
  newUri,
  artistAddress,
}: UpdateMomentURIInput): Promise<UpdateMomentURIResult> {
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  const updateTokenURICall = getUpdateTokenURICall(moment, newUri);

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [updateTokenURICall],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
