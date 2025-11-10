import { normalize } from "viem/ens";

const isValidEnsName = (name: string): boolean => {
  if (!name || name.length === 0) return false;
  // Basic ENS validation: must contain at least one dot
  if (!name.includes(".")) return false;

  // Try to normalize the ENS name to validate format
  // normalize() will throw if the name format is invalid
  try {
    normalize(name);
    // normalize() might not throw for all invalid names, so we do additional checks
    // ENS names should be lowercase after normalization and follow certain patterns
    const normalized = normalize(name);
    // Additional validation: check if it looks like a valid ENS name format
    // Valid ENS names are typically: label.eth or subdomain.label.eth
    // They should not have consecutive dots, should end with a valid TLD, etc.
    if (normalized.includes("..")) return false; // No consecutive dots
    if (normalized.startsWith(".") || normalized.endsWith(".")) return false; // No leading/trailing dots
    return true;
  } catch {
    return false;
  }
};

export default isValidEnsName;
