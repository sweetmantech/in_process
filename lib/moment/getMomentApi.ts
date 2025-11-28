import { Moment } from "@/types/moment";

export const getMomentApi = async (moment: Moment) => {
  const params = new URLSearchParams({
    collectionAddress: moment.collectionAddress.toString(),
    tokenId: moment.tokenId,
    chainId: moment.chainId.toString(),
  });
  const res = await fetch(`/api/moment?${params.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Failed to fetch moment info" }));
    throw new Error(error.error || "Failed to fetch moment info");
  }
  return res.json();
};
