import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

async function fetchCollections(): Promise<Collection[]> {
  const response = await fetch("/api/dune/collections");
  if (!response.ok) {
    throw new Error("Failed to fetch create feeds");
  }
  const data = await response.json();
  return data;
}

export function useCollections() {
  return useQuery({
    queryKey: ["created"],
    queryFn: () => fetchCollections(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
