import { NftMetadata } from "@/lib/dune/getLatestFeed";
import { getMetadata } from "@/lib/viem/getMetadata";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchArtistFeed(artistAddress: string): Promise<NftMetadata[]> {
  const response = await fetch(
    `/api/dune/artist?artistAddress=${artistAddress}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist feed");
  }
  const data = await response.json();
  const metadata = await getMetadata(data);
  return metadata.filter((ele: NftMetadata) => ele.name);
}

export function useArtistFeed() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artistFeed"],
    queryFn: () => fetchArtistFeed(artistAddress as string),
    staleTime: 1000 * 60 * 5,
    enabled: !!artistAddress,
    refetchOnWindowFocus: false,
  });
}
