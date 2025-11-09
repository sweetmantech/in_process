import { isAddress } from "viem";
import isValidEnsName from "./isValidEnsName";

const validateAddress = (value: string): string | null => {
  if (!value || value === "") return null;

  // Check if it's a valid address
  if (isAddress(value)) {
    return null; // Valid address, no error
  }

  // Check if it looks like an ENS name (contains a dot)
  if (value.includes(".")) {
    // If it contains a dot, it should be a valid ENS name
    if (isValidEnsName(value)) {
      return null; // Valid ENS name, no error
    } else {
      return "Invalid ENS name"; // Invalid ENS name
    }
  }

  // If it doesn't look like an address or ENS, it might be partial input
  // Only show error if it looks like a complete but invalid input
  // (e.g., has some characters but doesn't match address format)
  if (value.length > 10 && !value.startsWith("0x")) {
    return "Invalid address or ENS name";
  }

  return null; // Partial input, no error yet
};

export default validateAddress;
