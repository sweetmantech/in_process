import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchArtistCollections(
  artistAddress: string | string[] | undefined,
): Promise<Collection[]> {
  const response = await fetch(
    `/api/dune/artist/collections?artistAddress=${artistAddress || ""}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist collections");
  }
  const data = await response.json();
  return data;
}

export function useArtistCollections() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artistCollections", artistAddress],
    queryFn: () => fetchArtistCollections(artistAddress),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
