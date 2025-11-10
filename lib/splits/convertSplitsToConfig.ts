import { CreateSplitV2Config, SplitRecipient } from "@0xsplits/splits-sdk";
import { Address } from "viem";

export const convertSplitsToConfig = async (
  splits: SplitRecipient[],
  ownerAddress: Address
): Promise<CreateSplitV2Config | null> => {
  if (splits.length === 0) {
    return null;
  }

  const config: CreateSplitV2Config = {
    recipients: splits,
    distributorFeePercent: 0,
    totalAllocationPercent: 100.0,
    splitType: "push" as CreateSplitV2Config["splitType"],
    ownerAddress,
    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
  };

  return config;
};
