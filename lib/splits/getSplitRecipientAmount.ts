import { Address } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { retriesGeneric } from "@/lib/protocolSdk/retries";

/**
 * Calculates the amount a specific recipient receives from a split contract.
 * Gets the recipient's allocation percentage and multiplies by the total amount.
 */
const getSplitRecipientAmount = async (
  splitAddress: Address,
  chainId: number,
  recipientAddress: Address,
  totalAmount: string
): Promise<string> => {
  const publicClient = getPublicClient(chainId);
  const splitsClient = getSplitsClient({
    chainId,
    publicClient,
  });

  // Get split metadata via provider to access split recipients with retry logic
  const splitMetadata = await retriesGeneric({
    tryFn: async () => {
      return await splitsClient.getSplitMetadataViaProvider({
        splitAddress,
      });
    },
    maxTries: 3,
    linearBackoffMS: 200,
    shouldRetryOnError: (err: any) => {
      // Retry on network errors, rate limiting, and transient errors
      // Don't retry on validation errors (e.g., invalid address)
      return (
        err?.code === 429 ||
        err?.message?.includes("timeout") ||
        err?.message?.includes("network") ||
        err?.message?.includes("ECONNREFUSED") ||
        err?.message?.includes("ETIMEDOUT")
      );
    },
  });

  // Find the recipient's allocation percentage
  const recipient = splitMetadata.split.recipients.find(
    (r) => r.recipient.address.toLowerCase() === recipientAddress.toLowerCase()
  );

  if (!recipient) {
    // If recipient not found in split, return 0
    return "0";
  }

  // Calculate amount: (percentage / 100) * totalAmount
  const totalAmountNumber = parseFloat(totalAmount);
  const percentage = recipient.percentAllocation || 0;
  const calculatedAmount = (percentage / 100) * totalAmountNumber;

  return calculatedAmount.toFixed(6);
};

export default getSplitRecipientAmount;
