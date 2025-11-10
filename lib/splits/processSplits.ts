import { Address } from "viem";
import { SplitRecipient } from "@0xsplits/splits-sdk";
import { convertSplitsToConfig } from "./convertSplitsToConfig";
import { getSplitAddress } from "./getSplitAddress";
import { createSplitContract } from "./createSplitContract";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";

export interface ProcessSplitsResult {
  splitAddress: Address | null;
}

export const processSplits = async (
  splits: SplitRecipient[],
  smartAccount: EvmSmartAccount
): Promise<ProcessSplitsResult> => {
  // If no splits configured, return null
  if (splits.length === 0) {
    return { splitAddress: null };
  }

  // Convert splits to CreateSplitConfig format
  const splitConfig = await convertSplitsToConfig(splits, smartAccount.address);
  if (!splitConfig) {
    return { splitAddress: null };
  }

  // Predict split address
  const { splitAddress, splitExists } = await getSplitAddress(splitConfig);

  // Create split contract if it doesn't exist
  if (!splitExists) {
    await createSplitContract(splitConfig, smartAccount);
  }

  return { splitAddress };
};
