import { IN_PROCESS_API } from "@/lib/consts";

export async function disconnectPhone(accessToken: string): Promise<void> {
  const response = await fetch(`${IN_PROCESS_API}/phones`, {
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
