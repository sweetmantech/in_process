import { getMetadata, LatestFeed, NftMetadata } from "@/lib/viem/getMetadata";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function fetchLatestFeed(): Promise<LatestFeed[]> {
  const response = await fetch(`/api/dune/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest");
  }
  return response.json();
}

export function useLatestFeed() {
  const { data } = useQuery({
    queryKey: ["latestFeed"],
    queryFn: () => fetchLatestFeed(),
    staleTime: 1000 * 60 * 5,
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
