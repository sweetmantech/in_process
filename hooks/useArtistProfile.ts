import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Address } from "viem";

export interface ZoraProfile {
  displayName: string;
  avatarUri: string | null;
  description: string | null;
  website: string | null;
  socialAccounts: {
    twitter: {
      platform: string;
      username: string;
      display_name: string | null;
    } | null;
    farcaster: {
      platform: string;
      username: string;
      display_name: string | null;
    } | null;
    tiktok: {
      platform: string;
      username: string;
      display_name: string | null;
    } | null;
    instagram: {
      platform: string;
      username: string;
      display_name: string | null;
    } | null;
  };
}
async function fetchArtistProfile(
  artistAddress: Address,
): Promise<ZoraProfile> {
  const response = await fetch(`/api/profile?walletAddress=${artistAddress}`);
  const data = await response.json();
  return data;
}

export function useArtistProfile() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artist_profile", artistAddress],
    queryFn: () => fetchArtistProfile(artistAddress as Address),
    staleTime: 1000 * 60 * 5,
    enabled: !!artistAddress,
    refetchOnMount: true,
  });
}
