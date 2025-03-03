import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchLatestFeed(
  artistAddress: string | string[] | undefined,
): Promise<Collection[]> {
  const response = await fetch(
    `/api/dune/latest?artistAddress=${artistAddress || ""}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch latest");
  }
  const data = await response.json();
  return data;
}

export function useLatestFeed() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["latestFeed", artistAddress],
    queryFn: () => fetchLatestFeed(artistAddress),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 4000,
    refetchOnMount: true,
  });
}
