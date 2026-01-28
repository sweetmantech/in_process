import { CollectionResponse, FetchCollectionParams } from "@/types/collections";
import { IN_PROCESS_API } from "@/lib/consts";

export async function fetchCollection({
  collectionAddress,
  chainId,
}: FetchCollectionParams): Promise<CollectionResponse> {
  const params = new URLSearchParams({
    collectionAddress: collectionAddress.toLowerCase(),
  });
  if (chainId) params.append("chainId", String(chainId));

  const res = await fetch(`${IN_PROCESS_API}/collection?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch collection");
  }
  return res.json();
}
