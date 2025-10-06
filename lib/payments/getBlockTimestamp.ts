import { getPublicClient } from "@/lib/viem/publicClient";

export async function getBlockTimestamp(
  blockNumber: string,
  chainId: number,
): Promise<Date | null> {
  try {
    const publicClient = getPublicClient(chainId);
    const block = await publicClient.getBlock({
      blockNumber: BigInt(blockNumber),
    });
    return new Date(Number(block.timestamp) * 1000);
  } catch (error) {
    console.error("Failed to get block timestamp:", error);
    return null;
  }
}
