import { AirdropResponse } from "@/types/airdrop";
import { Address } from "viem";
import { CHAIN_ID } from "../consts";

export const getAirdropsApi = async (artist_address: Address): Promise<AirdropResponse[]> => {
  const params = new URLSearchParams({
    artist_address,
    chainId: CHAIN_ID.toString(),
    offset: "1000",
  });

  const response = await fetch(`/api/moment/airdrop?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch airdrops" }));
    throw new Error(error.message || "Failed to fetch airdrops");
  }
  return response.json();
};
