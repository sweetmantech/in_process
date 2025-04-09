import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

async function fetchCreatedFeed(): Promise<Collection[]> {
  const response = await fetch("/api/dune/created");
  if (!response.ok) {
    throw new Error("Failed to fetch create feeds");
  }
  const data = await response.json();
  return data;
}

export function useCreatedFeed() {
  return useQuery({
    queryKey: ["created"],
    queryFn: () => fetchCreatedFeed(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 4000,
    refetchOnMount: true,
  });
}
