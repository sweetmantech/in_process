import { Address, zeroAddress } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";

export interface GetSplitCallParams {
  splitAddress: Address;
  tokenAddress: Address;
  chainId: number;
}

/**
 * Gets the call data for distributing funds from a split contract.
 */
export const getSplitCall = async ({ splitAddress, tokenAddress, chainId }: GetSplitCallParams) => {
  const publicClient = getPublicClient(chainId);
  const splitsClient = getSplitsClient({
    chainId,
    publicClient,
  });

  const distributeCallData = await splitsClient.callData.distribute({
    splitAddress,
    tokenAddress,
    distributorAddress: zeroAddress,
  });

  return {
    to: distributeCallData.address as Address,
    data: distributeCallData.data,
  };
};
