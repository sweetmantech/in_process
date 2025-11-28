import { Moment } from "@/types/moment";

export const getMomentApi = async (moment: Moment) => {
  const params = new URLSearchParams({
    tokenContract: moment.collectionAddress,
    tokenId: moment.tokenId,
    ...(moment.chainId && { chainId: String(moment.chainId) }),
  });
  const res = await fetch(`/api/moment?${params.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Failed to fetch moment info" }));
    throw new Error(error.error || "Failed to fetch moment info");
  }
  return res.json();
};
