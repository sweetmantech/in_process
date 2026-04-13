import { AirdropsApiResponse } from "@/types/airdrop";
import { Address } from "viem";
import { CHAIN_ID, IN_PROCESS_API } from "../consts";

export const getAirdropsApi = async (artist_address: Address): Promise<AirdropsApiResponse> => {
  const params = new URLSearchParams({
    type: "airdrop",
    spender: artist_address,
    chainId: CHAIN_ID.toString(),
    page: "1",
    limit: "20",
  });

  const response = await fetch(`${IN_PROCESS_API}/transfers?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch airdrops" }));
    throw new Error(error.message || "Failed to fetch airdrops");
  }
  return response.json();
};
