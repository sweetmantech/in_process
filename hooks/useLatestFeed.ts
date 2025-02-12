import { useQuery } from "@tanstack/react-query";
import type { NftMetadata } from "@/lib/dune/getLatestFeed";

async function fetchLatestFeed(): Promise<NftMetadata[]> {
  const response = await fetch('/api/dune/latest');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

interface UseLatestFeedOptions {
  initialData?: NftMetadata[];
}

export function useLatestFeed({ initialData }: UseLatestFeedOptions = {}) {
  return useQuery({
    queryKey: ["latestFeed"],
    queryFn: fetchLatestFeed,
    initialData,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes
    refetchInterval: 1000 * 60 * 5, // Refresh every 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
}