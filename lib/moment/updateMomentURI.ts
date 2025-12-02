import { Hash } from "viem";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import getUpdateTokenURICall from "@/lib/viem/getUpdateTokenURICall";
import { UpdateMomentURIInput, UpdateMomentURIResult } from "@/types/moment";

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
