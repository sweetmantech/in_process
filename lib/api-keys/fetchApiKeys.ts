/**
 * Fetch API keys for an artist
 * @param accessToken - The access token for authentication
 * @returns Promise with the list of API keys
 */
export async function fetchApiKeys(accessToken: string): Promise<any[]> {
  const response = await fetch(`/api/artists/api-keys`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch API keys");
  }

  return data.keys || [];
}
