import { Address, Hash } from "viem";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";

/**
 * Distributes funds from a split contract to its recipients.
 * Uses 0xSplits SDK to generate the distribution call data and executes it via smart wallet.
 */
export async function distributeSplitCall({
  splitAddress,
  tokenAddress = USDC_ADDRESS,
  smartAccount,
}: {
  splitAddress: Address;
  tokenAddress?: Address;
  smartAccount: EvmSmartAccount;
}): Promise<Call<unknown, { [key: string]: unknown }>> {
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

  return {
    to: distributeCallData.address as Address,
    data: distributeCallData.data,
  };
}
