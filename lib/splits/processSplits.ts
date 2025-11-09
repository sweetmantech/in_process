import { Address } from "viem";
import { convertSplitsToConfig } from "./convertSplitsToConfig";
import { getSplitAddress } from "./getSplitAddress";
import { createSplitContract } from "./createSplitContract";
import { Split } from "@/hooks/useSplits";

export interface ProcessSplitsResult {
  splitAddress: Address | null;
}

export const processSplits = async (
  splits: Split[],
  account: Address
): Promise<ProcessSplitsResult> => {
  // If no splits configured, return null
  if (splits.length === 0) {
    return { splitAddress: null };
  }

  // Convert splits to CreateSplitConfig format
  const splitConfig = await convertSplitsToConfig(splits);
  if (!splitConfig) {
    return { splitAddress: null };
  }

  // Predict split address
  const { splitAddress, splitExists } = await getSplitAddress(splitConfig);

  // Create split contract if it doesn't exist
  if (!splitExists) {
    await createSplitContract(splitConfig, account);
  }

  return { splitAddress };
};
