import { Collector, MomentCollectorsInput, MomentCollectorsResult } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

async function fetchCollectors({ moment, offset }: MomentCollectorsInput): Promise<Collector[]> {
  try {
    const queryString = new URLSearchParams({
      collectionAddress: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: moment.chainId.toString(),
      offset: offset?.toString() || "0",
    });

    const response = await fetch(`${IN_PROCESS_API}/moment/collectors?${queryString}`);

    if (!response.ok) {
      throw new Error("Failed to fetch collectors.");
    }
    const data: MomentCollectorsResult = await response.json();
    return data.collectors;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchCollectors;
