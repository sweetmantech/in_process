import { Address, zeroAddress } from "viem";
import { baseSepolia } from "viem/chains";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import isSplitContract from "./isSplitContract";
import { getSplitCall } from "./getSplitCall";

export async function distribute({
  splitAddress,
  tokenAddress,
  chainId,
}: {
  splitAddress: Address;
  tokenAddress: Address;
  chainId: number;
}) {
  const isSplit = await isSplitContract(splitAddress, chainId);
  if (!isSplit) {
    throw new Error(
      `Invalid split contract address: ${splitAddress}. The address does not correspond to a valid split contract on chain ${chainId}.`
    );
  }
  try {
    const smartAccount = await getOrCreateSmartWallet({
      address: zeroAddress,
    });
    const splitCall = await getSplitCall({
      splitAddress,
      tokenAddress,
      chainId,
    });
    // Send the transaction and wait for receipt using the helper
    const transaction = await sendUserOperation({
      smartAccount,
      network: chainId === baseSepolia.id ? "base-sepolia" : "base",
      calls: [splitCall],
    });
    return transaction.transactionHash;
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
}
