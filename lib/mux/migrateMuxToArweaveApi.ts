import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

export interface MigrateMuxToArweaveApiInput {
  collectionAddress: Address;
  tokenIds: string[];
  chainId?: number;
}

export interface MigrateMuxToArweaveApiResult {
  success: boolean;
  runId: string;
  message: string;
}

/**
 * Client-side API call to trigger MUX to Arweave migration
 */
export async function migrateMuxToArweaveApi(
  input: MigrateMuxToArweaveApiInput,
  accessToken: string
): Promise<MigrateMuxToArweaveApiResult> {
  const response = await fetch(`${IN_PROCESS_API}/moment/trigger-mux-to-arweave`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to migrate MUX to Arweave");
  }

  const data = await response.json();

  return data;
}
