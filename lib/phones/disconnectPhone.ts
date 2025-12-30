export async function disconnectPhone(accessToken: string): Promise<void> {
  const response = await fetch("/api/phones", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to disconnect phone number");
  }
}
