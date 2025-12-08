import { Address } from "viem";

export interface CallUpdateCollectionURIInput {
  collection: {
    address: Address;
    chainId: number;
  };
  newUri: string;
  accessToken: string;
}

/**
 * Calls the API endpoint to update collection URI.
 * Handles authentication and error responses.
 */
export async function callUpdateCollectionURI({
  collection,
  newUri,
  accessToken,
}: CallUpdateCollectionURIInput): Promise<void> {
  try {
    const response = await fetch("/api/collection/update-uri", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection,
        newUri,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update collection metadata");
    }
    return data.hash;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update collection metadata");
  }
}
