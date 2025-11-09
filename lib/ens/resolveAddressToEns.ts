import { Address } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { mainnet } from "viem/chains";

const resolveAddressToEns = async (address: Address): Promise<string | null> => {
  try {
    const publicClient = getPublicClient(mainnet.id);
    const ensName = await publicClient.getEnsName({ address });
    return ensName || null;
  } catch (error: any) {
    // Handle specific error cases
    // Rate limiting (429) or execution reverted errors are common with ENS
    if (error?.code === 429 || error?.message?.includes("execution reverted")) {
      // Silently fail for rate limiting - caller can retry
      return null;
    }
    // Log other errors for debugging
    console.error("Error resolving address to ENS:", error);
    return null;
  }
};

export default resolveAddressToEns;
