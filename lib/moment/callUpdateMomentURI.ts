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
  const response = await fetch("/api/moment/update-uri", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      tokenContractAddress,
      tokenId,
      newUri,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update moment metadata");
  }
}
