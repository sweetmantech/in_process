import { CreateSplitV2Config, SplitRecipient } from "@0xsplits/splits-sdk";
import { Address, getAddress } from "viem";
import resolveEnsToAddress from "@/lib/ens/resolveEnsToAddress";

export const convertSplitsToConfig = async (
  splits: SplitRecipient[],
  ownerAddress: Address
): Promise<CreateSplitV2Config | null> => {
  if (splits.length === 0) {
    return null;
  }

  const recipients = await Promise.all(
    splits.map(async (split) => {
      let address: Address;

      // If it's already an address, use it
      if (split.address.startsWith("0x")) {
        address = getAddress(split.address);
      } else {
        // Otherwise, resolve ENS name
        const resolved = await resolveEnsToAddress(split.address);
        if (!resolved) {
          throw new Error(`Failed to resolve ENS name: ${split.address}`);
        }
        address = getAddress(resolved);
      }

      return {
        address,
        percentAllocation: split.percentAllocation,
      };
    })
  );

  const config: CreateSplitV2Config = {
    recipients: recipients.map((r) => ({
      address: r.address as string,
      percentAllocation: r.percentAllocation,
    })),
    distributorFeePercent: 0,
    totalAllocationPercent: 100.0,
    splitType: "push" as CreateSplitV2Config["splitType"],
    ownerAddress,
    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
  };

  return config;
};
