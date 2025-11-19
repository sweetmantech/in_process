import { Address } from "viem";

export interface MigrateMuxToArweaveApiInput {
  tokenContractAddress: Address;
  tokenId: string;
  accessToken: string;
}

export interface MigrateMuxToArweaveApiResult {
  success: boolean;
  arweaveUri: string;
  transactionHash: string;
}

/**
 * Client-side API call to trigger MUX to Arweave migration
 */
export async function migrateMuxToArweaveApi({
  tokenContractAddress,
  tokenId,
  accessToken,
}: MigrateMuxToArweaveApiInput): Promise<MigrateMuxToArweaveApiResult> {
  const response = await fetch("/api/moment/migrate-mux-to-arweave", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      tokenContractAddress,
      tokenId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to migrate MUX to Arweave");
  }

  const data = await response.json();

  return data;
}
