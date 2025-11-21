export interface CallUpdateMomentURIInput {
  tokenContractAddress: string;
  tokenId: string;
  newUri: string;
  accessToken: string;
}

/**
 * Calls the API endpoint to update moment URI.
 * Handles authentication and error responses.
 */
export async function callUpdateMomentURI({
  tokenContractAddress,
  tokenId,
  newUri,
  accessToken,
}: CallUpdateMomentURIInput): Promise<void> {
  try {
    const response = await fetch("/api/moment/update-uri", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        moment: {
          contractAddress: tokenContractAddress,
          tokenId: tokenId,
        },
        newUri,
      }),
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update moment metadata");
  }
}
