import { getMetadata, NftMetadata } from "@/lib/viem/getMetadata";
import { useQuery } from "@tanstack/react-query";

async function fetchLatestFeed(): Promise<NftMetadata[]> {
  const response = await fetch(`/api/dune/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest");
  }
  const data = await response.json();
  const metadata = await getMetadata(data);
  return metadata.filter((ele: NftMetadata) => ele.name);
}

export function useLatestFeed() {
  return useQuery({
    queryKey: ["latestFeed"],
    queryFn: () => fetchLatestFeed(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
