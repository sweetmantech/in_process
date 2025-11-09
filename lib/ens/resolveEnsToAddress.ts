import { Address } from "viem";
import { normalize } from "viem/ens";
import { getPublicClient } from "@/lib/viem/publicClient";
import { mainnet } from "viem/chains";

const resolveEnsToAddress = async (ensName: string): Promise<Address | null> => {
  try {
    const publicClient = getPublicClient(mainnet.id);
    const address = await publicClient.getEnsAddress({
      name: normalize(ensName),
    });
    return address || null;
  } catch (error: any) {
    // Handle specific error cases
    // Rate limiting (429) or execution reverted errors are common with ENS
    if (error?.code === 429 || error?.message?.includes("execution reverted")) {
      // Silently fail for rate limiting - caller can retry
      return null;
    }
    // Log other errors for debugging
    console.error("Error resolving ENS to address:", error);
    return null;
  }
};

export default resolveEnsToAddress;
