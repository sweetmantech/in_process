import { Address, isAddress, getAddress } from "viem";
import resolveEnsToAddress from "./resolveEnsToAddress";

/**
 * Resolves an input string to a normalized Ethereum address.
 * Accepts either a direct address or an ENS name.
 *
 * @param {string} input - The input string (address or ENS name)
 * @returns {Promise<Address>} The normalized address
 * @throws {Error} If the input is neither a valid address nor a resolvable ENS name
 */
export const resolveAddressOrEns = async (input: string): Promise<Address> => {
  // Check if input is already an address
  if (isAddress(input)) {
    return getAddress(input);
  }

  // Try to resolve as ENS name
  const ensAddress = await resolveEnsToAddress(input);

  if (!ensAddress) {
    throw new Error("Invalid address or ENS name could not be resolved");
  }

  return getAddress(ensAddress);
};
