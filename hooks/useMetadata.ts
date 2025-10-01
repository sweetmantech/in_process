import {getFetchableUrl} from "@/lib/protocolSdk/ipfs/gateway";
import {Metadata} from "@/types/token";
import {useQuery} from "@tanstack/react-query";

async function fetchMetadata(uri: string): Promise<Metadata> {
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
  return await response.json();
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
