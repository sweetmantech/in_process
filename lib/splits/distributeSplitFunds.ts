import { Address, Hash } from "viem";
import { CHAIN_ID, IS_TESTNET, USDC_ADDRESS } from "@/lib/consts";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";

/**
 * Distributes funds from a split contract to its recipients.
 * Uses 0xSplits SDK to generate the distribution call data and executes it via smart wallet.
 */
export async function distributeSplitFunds({
  splitAddress,
  tokenAddress = USDC_ADDRESS,
  smartAccount,
}: {
  splitAddress: Address;
  tokenAddress?: Address;
  smartAccount: EvmSmartAccount;
}): Promise<Hash> {
  const publicClient = getPublicClient(CHAIN_ID);
  const splitsClient = getSplitsClient({
    chainId: CHAIN_ID,
    publicClient,
  });

  const distributeCallData = await splitsClient.callData.distribute({
    splitAddress,
    tokenAddress,
    distributorAddress: smartAccount.address,
  });

  const distributeTransaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: distributeCallData.address as Address,
        data: distributeCallData.data,
      },
    ],
  });

  return distributeTransaction.transactionHash as Hash;
}
