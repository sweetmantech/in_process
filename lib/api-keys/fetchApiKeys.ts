/**
 * Fetch API keys for an artist
 * @param artistWallet - The artist's wallet address
 * @param accessToken - The access token for authentication
 * @returns Promise with the list of API keys
 */
export async function fetchApiKeys(artistWallet: string, accessToken: string): Promise<any[]> {
  const response = await fetch(
    `/api/artists/api-keys?artist_address=${encodeURIComponent(artistWallet)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch API keys");
  }

  return data.keys || [];
}
