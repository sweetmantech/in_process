import { Address } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { retriesGeneric } from "@/lib/protocolSdk/retries";

/**
 * Gets split metadata via provider to access split recipients with retry logic.
 */
const getSplitRecipients = async (splitAddress: Address, chainId: number) => {
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

  return splitMetadata.split.recipients;
};

export default getSplitRecipients;
