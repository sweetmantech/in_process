import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Collection, Metadata } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

async function fetchMetadata(feed: Collection): Promise<Metadata> {
  const response = await fetch(
    `/api/metadata?uri=${getFetchableUrl(feed.contractURI)}`,
  );
  if (!response.ok) {
    return {
      name: "",
      image: "",
      description: "",
    };
  }
  const data = await response.json();
  return data;
}
export function useMetadata(feed: Collection) {
  return useQuery({
    queryKey: ["metadata", feed],
    queryFn: () => fetchMetadata(feed),
    staleTime: 1000 * 60 * 5,
    enabled: !!feed,
    refetchOnMount: true,
  });
}
