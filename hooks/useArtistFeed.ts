import { getUris, LatestFeed } from "@/lib/viem/getUris";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchArtistFeed(artistAddress: string): Promise<LatestFeed[]> {
  const response = await fetch(
    `/api/dune/artist?artistAddress=${artistAddress}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist feed");
  }
  const data = await response.json();
  const uris = await getUris(data);
  return uris;
}

export function useArtistFeed() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artistFeed", artistAddress],
    queryFn: () => fetchArtistFeed(artistAddress as string),
    staleTime: 1000 * 60 * 5,
    enabled: !!artistAddress,
    refetchOnMount: true,
  });
}
