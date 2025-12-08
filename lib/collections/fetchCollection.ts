import { CollectionResponse, FetchCollectionParams } from "@/types/collections";

export async function fetchCollection({
  collectionAddress,
  chainId,
}: FetchCollectionParams): Promise<CollectionResponse> {
  const params = new URLSearchParams({
    collectionAddress: collectionAddress.toLowerCase(),
  });
  if (chainId) params.append("chainId", String(chainId));

  const res = await fetch(`/api/collection?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch collection");
  }
  return res.json();
}
