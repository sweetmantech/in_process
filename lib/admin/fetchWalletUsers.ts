/**
 * Fetch wallet users for admin
 * @param accessToken - The access token for authentication
 * @returns Promise with the list of wallet users
 */
export interface WalletUser {
  walletAddress: string;
  walletType: string;
  signInMethod: "email_then_wallet" | "wallet_direct";
  lastSeen: string;
  userId: string;
}

export async function fetchWalletUsers(accessToken: string): Promise<WalletUser[]> {
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
