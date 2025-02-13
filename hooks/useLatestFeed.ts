import { getUris, LatestFeed } from "@/lib/viem/getUris";
import { useQuery } from "@tanstack/react-query";

async function fetchLatestFeed(): Promise<LatestFeed[]> {
  const response = await fetch(`/api/dune/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest");
  }
  const data = await response.json();
  const feeds = await getUris(data);
  return feeds;
}

export function useLatestFeed() {
  return useQuery({
    queryKey: ["latestFeed"],
    queryFn: () => fetchLatestFeed(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
