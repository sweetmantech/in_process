import { Address } from "viem";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

/**
 * Determines if an address is not the signed artist wallet or the connected smart wallet.
 * Returns true if the address is external (not owned by the current user).
 *
 * @param address - The address to check
 * @returns true if the address is not the artist wallet and not the smart wallet, false otherwise
 */
export const useIsNotOwnWallet = (address: Address): boolean => {
  const { artistWallet } = useUserProvider();
  const { smartWallet } = useSmartWalletProvider();

  // Guard against undefined/null/empty values before calling toLowerCase
  if (!address) return false;

  const normalizedAddress = address.toLowerCase();
  const normalizedArtistWallet = artistWallet?.toLowerCase() ?? undefined;
  // Handle empty string case for smartWallet
  const normalizedSmartWallet =
    smartWallet && smartWallet.trim() !== "" ? smartWallet.toLowerCase() : undefined;

  // Address is not own wallet if it's not the artist wallet and not the smart wallet
  return (
    normalizedAddress !== normalizedArtistWallet && normalizedAddress !== normalizedSmartWallet
  );
};
