import { Address, encodeFunctionData, Hash } from "viem";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";

export interface UpdateMomentURIInput {
  tokenContractAddress: Address;
  tokenId: string;
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
  tokenContractAddress,
  tokenId,
  newUri,
  artistAddress,
}: UpdateMomentURIInput): Promise<UpdateMomentURIResult> {
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  // Encode the updateTokenURI function call
  const updateTokenURIData = encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: "updateTokenURI",
    args: [BigInt(tokenId), newUri],
  });

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: tokenContractAddress,
        data: updateTokenURIData,
      },
    ],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
