/**
 * Create a new API key for an artist
 * @param keyName - The name for the API key
 * @param artistWallet - The artist's wallet address
 * @returns Promise with the created API key
 */
export async function createApiKey(
  keyName: string,
  artistWallet: string,
  accessToken: string
): Promise<string> {
  const response = await fetch("/api/artists/api-keys", {
    method: "POST",
    body: JSON.stringify({ key_name: keyName, artist_address: artistWallet }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create API key");
  }

  return data.key;
}
