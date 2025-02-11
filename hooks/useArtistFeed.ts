import { getMetadata, LatestFeed, NftMetadata } from "@/lib/viem/getMetadata";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchArtistFeed(artistAddress: string): Promise<LatestFeed[]> {
  const response = await fetch(
    `/api/dune/artist?artistAddress=${artistAddress}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch latest");
  }
  return response.json();
}

export function useArtistFeed() {
  const { artistAddress } = useParams();
  const { data } = useQuery({
    queryKey: ["artistFeed"],
    queryFn: () => fetchArtistFeed(artistAddress as string),
    staleTime: 1000 * 60 * 5,
    enabled: !!artistAddress,
    refetchOnWindowFocus: false,
  });
  const [feed, setFeed] = useState<NftMetadata[]>([]);

  useEffect(() => {
    async function fetchMetadata() {
      if (!data) return;
      const metadata = await getMetadata(data);
      setFeed(metadata);
    }
    fetchMetadata();
  }, [data]);

  return {
    feed,
  };
}
