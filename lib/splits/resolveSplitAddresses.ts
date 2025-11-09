import { Address, getAddress } from "viem";
import { SplitRecipient } from "@0xsplits/splits-sdk";
import resolveEnsToAddress from "@/lib/ens/resolveEnsToAddress";

/**
 * Resolves all split addresses from ENS names to addresses.
 * If an address is already in 0x format, it's normalized.
 * Throws an error if any ENS name fails to resolve.
 */
export const resolveSplitAddresses = async (
  splits: SplitRecipient[]
): Promise<SplitRecipient[]> => {
  return Promise.all(
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
        address: address as string,
        percentAllocation: split.percentAllocation,
      };
    })
  );
};
