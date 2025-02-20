import { CROSSMINT_SIGNER_ADDRESS } from "@/lib/consts";
import { MintCommentEvent } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

async function fetchMintEvents(): Promise<MintCommentEvent[]> {
  const response = await fetch(
    `/api/dune/mint_comments?tokenContract=${CROSSMINT_SIGNER_ADDRESS}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch mint events.");
  }
  const data = await response.json();
  return data;
}

const useCrossmintMintComments = () => {
  return useQuery({
    queryKey: ["crossmintMintComments"],
    queryFn: () => fetchMintEvents(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
};

export default useCrossmintMintComments;
