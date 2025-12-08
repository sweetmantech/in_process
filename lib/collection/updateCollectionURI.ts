import { Hash } from "viem";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { UpdateCollectionURIInput, UpdateCollectionURIResult } from "@/types/collections";
import getUpdateCollectionURICall from "../viem/getUpdateCollectionURICall";

/**
 * Updates collection URI using a smart account via Coinbase CDP.
 * Handles the transaction on the backend side.
 */
export async function updateCollectionURI({
  collection,
  newUri,
  newCollectionName,
  artistAddress,
}: UpdateCollectionURIInput): Promise<UpdateCollectionURIResult> {
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  const updateCollectionURICall = getUpdateCollectionURICall(collection, newUri, newCollectionName);

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [updateCollectionURICall],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
