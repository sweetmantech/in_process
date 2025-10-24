/**
 * Delete an API key
 * @param keyId - The ID of the API key to delete
 * @param accessToken - The access token for authentication
 * @returns Promise with the deletion result
 */
export async function deleteApiKey(keyId: string, accessToken: string): Promise<void> {
  const response = await fetch(`/api/artists/api-keys?keyId=${keyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete API key");
  }
}
