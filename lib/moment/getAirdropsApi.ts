import { Moment } from "@/types/moment";
import { AirdropResponse } from "@/types/airdrop";

export const getAirdropsApi = async (moment: Moment): Promise<AirdropResponse[]> => {
  const { collectionAddress, tokenId, chainId } = moment;
  const params = new URLSearchParams({
    collectionAddress: collectionAddress,
    tokenId: tokenId || "1",
    chainId: chainId.toString(),
    offset: "0",
  });

  const response = await fetch(`/api/moment/airdrop?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch airdrops" }));
    throw new Error(error.message || "Failed to fetch airdrops");
  }
  return response.json();
};
