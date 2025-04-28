import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

async function fetchCollections(): Promise<Collection[]> {
  const response = await fetch(`/api/dune/collections`);
  if (!response.ok) {
    throw new Error("Failed to fetch all collections");
  }
  const data = await response.json();
  return data;
}

export function useCollections() {
  return useQuery({
    queryKey: ["collectons"],
    queryFn: () => fetchCollections(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
