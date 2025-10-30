import { type User } from "@privy-io/node";

/**
 * Fetch wallet users for admin
 * @param accessToken - The access token for authentication
 * @returns Promise with the list of Privy users
 */
export async function fetchWalletUsers(accessToken: string): Promise<User[]> {
  const response = await fetch("/api/admin/wallets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch wallet users");
  }

  return data.users || [];
}
