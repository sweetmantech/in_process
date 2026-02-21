import { IN_PROCESS_API } from "@/lib/consts";
import { Address } from "viem";

export const getCollectionApi = async (collectionAddress: Address, chainId: number) => {
  const params = new URLSearchParams({
    collectionAddress: collectionAddress.toString(),
    chainId: chainId.toString(),
  });
  const res = await fetch(`${IN_PROCESS_API}/collection?${params.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Failed to fetch collection info" }));
    throw new Error(error.error || "Failed to fetch collection info");
  }
  return res.json();
};
