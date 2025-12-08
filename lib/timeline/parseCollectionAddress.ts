import { getChainIdFromAddress } from "./getChainIdFromAddress";
import { Address } from "viem";

/**
 * Parses a collection address from URL params (handles URL-encoded format like %3A)
 * @param collectionAddress - Address from URL params (may be URL-encoded as %3A or plain :)
 * @returns Object with chainId and address
 */
export const parseCollectionAddress = (
  collectionAddress: string | undefined
): {
  chainId: number | undefined;
  address: Address | undefined;
} => {
  if (!collectionAddress) {
    return { chainId: undefined, address: undefined };
  }

  // Decode URL-encoded address (e.g., %3A -> :)
  // getChainIdFromAddress expects the address to contain :, so decode first
  const decodedAddress = decodeURIComponent(collectionAddress);
  const { chainId, addressOnly } = getChainIdFromAddress(decodedAddress);

  return {
    chainId: chainId || undefined,
    address: (addressOnly as Address) || undefined,
  };
};
