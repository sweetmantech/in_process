import { Collection } from "@/types/token";
import useSignedAddress from "./useSignedAddress";
import { useQuery } from "@tanstack/react-query";
import getTotalEarnings from "@/lib/viem/getTotalEarnings";
import { Address } from "viem";

async function fetchUserCollections(
  artistAddress: string | string[] | undefined,
): Promise<{
  totalEarnings: {
    eth: string;
    usdc: string;
  };
  userCollections: Collection[];
}> {
  const response = await fetch(
    `/api/dune/artist/collections?artistAddress=${artistAddress || ""}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user collections");
  }
  const data = await response.json();
  const sum = await getTotalEarnings(data, artistAddress as Address);
  return {
    totalEarnings: sum,
    userCollections: data,
  };
}

export function useUserCollections() {
  const signedAddress = useSignedAddress();
  return useQuery({
    queryKey: ["fetchUserCollections", signedAddress],
    queryFn: () => fetchUserCollections(signedAddress),
    enabled: Boolean(signedAddress),
    staleTime: 60 * 1000 * 5,
    refetchOnMount: true,
  });
}
