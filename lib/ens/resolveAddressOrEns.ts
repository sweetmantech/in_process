import { isAddress } from "viem";
import resolveEnsToAddress from "./resolveEnsToAddress";

export interface ResolveAddressOrEnsResult {
  address: string;
  isValid: boolean;
  ensName: string;
}

const resolveAddressOrEns = async (value: string): Promise<ResolveAddressOrEnsResult> => {
  if (!value) {
    return { address: "", isValid: false, ensName: "" };
  }

  // Check if it's already a valid address
  if (isAddress(value)) {
    return {
      address: value,
      isValid: true,
      ensName: "",
    };
  }

  // Try to resolve as ENS name
  const ensAddress = await resolveEnsToAddress(value);

  return {
    address: ensAddress || "",
    isValid: Boolean(ensAddress),
    ensName: value,
  };
};

export default resolveAddressOrEns;
