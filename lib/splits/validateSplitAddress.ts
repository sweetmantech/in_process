import { isAddress } from "viem";
import isValidEnsName from "@/lib/ens/isValidEnsName";

export const validateSplitAddress = (address: string): string | null => {
  if (!address || address.trim() === "") {
    return "Address is required";
  }

  if (isAddress(address)) {
    return null;
  }

  if (address.includes(".")) {
    if (!isValidEnsName(address)) {
      return "Invalid ENS name";
    }
    return null;
  }

  return "Invalid address or ENS name";
};
