import fetchArtistProfile from "@/lib/fetchArtistProfile";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Address } from "viem";

export function useArtistProfile(address?: Address) {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artist_profile", address || artistAddress],
    queryFn: () => fetchArtistProfile(address || (artistAddress as Address)),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(address || artistAddress),
    refetchOnMount: true,
  });
}
