import fetchArtistProfile from "@/lib/fetchArtistProfile";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useArtistProfile(address?: Address) {
  return useQuery({
    queryKey: ["artist_profile", address],
    queryFn: () => fetchArtistProfile(address as Address),
    staleTime: 0,
    enabled: Boolean(address),
    refetchOnMount: true,
  });
}
