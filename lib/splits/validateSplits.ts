import { isAddress } from "viem";
import { Split } from "@/hooks/useSplits";
import isValidEnsName from "@/lib/ens/isValidEnsName";
import validateAddress from "@/lib/ens/validateAddress";

export const validateSplits = (
  splits: Split[],
  addressErrors: Record<number, string>
): string | null => {
  if (splits.length === 0) {
    return null; // No splits, validation passes
  }

  // Check total percentage
  const totalPercentage = splits.reduce((sum, split) => sum + (split.percentage || 0), 0);
  if (totalPercentage !== 100) {
    return "Splits total percentage must equal 100%";
  }

  // Check each split
  for (let i = 0; i < splits.length; i++) {
    const split = splits[i];

    // Check address is not empty
    if (!split.address || split.address.trim() === "") {
      return `Split ${i + 1}: Address is required`;
    }

    // Check for address errors
    if (addressErrors[i]) {
      return `Split ${i + 1}: ${addressErrors[i]}`;
    }

    // Validate address format
    const addressError = validateAddress(split.address);
    if (addressError) {
      return `Split ${i + 1}: ${addressError}`;
    }

    // Additional validation: check if it's a valid address or ENS name
    if (!isAddress(split.address)) {
      if (split.address.includes(".")) {
        // It's an ENS name, validate it
        if (!isValidEnsName(split.address)) {
          return `Split ${i + 1}: Invalid ENS name`;
        }
      } else {
        // Not an address and not an ENS name
        return `Split ${i + 1}: Invalid address or ENS name`;
      }
    }

    // Check percentage is valid
    if (split.percentage === undefined || split.percentage === null || isNaN(split.percentage)) {
      return `Split ${i + 1}: Percentage is required`;
    }

    if (split.percentage < 0 || split.percentage > 100) {
      return `Split ${i + 1}: Percentage must be between 0 and 100`;
    }
  }

  return null; // All validations passed
};
