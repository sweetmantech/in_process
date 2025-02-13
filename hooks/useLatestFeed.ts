import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

async function fetchLatestFeed(): Promise<Collection[]> {
  const response = await fetch(`/api/dune/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest");
  }
  const data = await response.json();
  return data;
}

export function useLatestFeed() {
  return useQuery({
    queryKey: ["latestFeed"],
    queryFn: () => fetchLatestFeed(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
