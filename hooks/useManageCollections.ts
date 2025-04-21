import { Collection } from "@/types/token";
import { useQuery } from "@tanstack/react-query";
import useSignedAddress from "./useSignedAddress";

async function fetchMyCollections(
  address: string | string[] | undefined,
): Promise<Collection[]> {
  const response = await fetch(
    `/api/dune/artist/collections?artistAddress=${address || ""}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch my collections");
  }
  const data = await response.json();
  return data;
}

export function useMyCollections() {
  const address = useSignedAddress();
  return useQuery({
    queryKey: ["myCollections", address],
    queryFn: () => fetchMyCollections(address),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
