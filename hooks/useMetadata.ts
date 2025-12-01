import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { MomentMetadata } from "@/types/moment";
import { useQuery } from "@tanstack/react-query";

async function fetchMetadata(uri: string): Promise<MomentMetadata> {
  const response = await fetch(`${getFetchableUrl(uri)}`);
  if (!response.ok) {
    return {
      name: "",
      image: "",
      description: "",
      content: {
        mime: "",
        uri: "",
      },
    };
  }
  const data = await response.json();
  return data;
}
export function useMetadata(uri: string) {
  return useQuery({
    queryKey: ["metadata", uri],
    queryFn: () => fetchMetadata(uri),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(uri),
    refetchOnMount: true,
  });
}
