import { Moment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

export const getMomentApi = async (moment: Moment) => {
  const { collectionAddress, tokenId, chainId } = moment;
  const params = new URLSearchParams({
    collectionAddress: collectionAddress.toString(),
    tokenId,
    chainId: chainId.toString(),
  });
  const res = await fetch(`${IN_PROCESS_API}/moment?${params.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Failed to fetch moment info" }));
    throw new Error(error.error || "Failed to fetch moment info");
  }
  return res.json();
};
