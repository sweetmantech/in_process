interface PrivyUser {
  id: string;
  linked_accounts: Array<{
    type: string;
    wallet_client_type?: string;
    address?: string;
    latest_verified_at?: number;
  }>;
  created_at: string;
  last_seen_at: string;
}

export interface WalletUser {
  walletAddress: string;
  walletType: string;
  signInMethod: "email_then_wallet" | "wallet_direct";
  lastSeen: string;
  userId: string;
}

export async function getWalletUsers(): Promise<WalletUser[]> {
  const url = "https://api.privy.io/v1/users";
  const options = {
    method: "GET",
    headers: {
      "privy-app-id": process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_PRIVY_APP_ID! + ":" + process.env.PRIVY_API_KEY!)}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch Privy users: ${response.statusText}`);
  }

  const data = await response.json();
  const users: PrivyUser[] = data.data || [];

  const walletUsers: WalletUser[] = [];

  for (const user of users) {
    const walletAccounts = user.linked_accounts.filter(
      (account) => account.type === "wallet" && account.address
    );

    const hasEmail = user.linked_accounts.some((account) => account.type === "email");

    const signInMethod: "email_then_wallet" | "wallet_direct" = hasEmail
      ? "email_then_wallet"
      : "wallet_direct";

    for (const walletAccount of walletAccounts) {
      const walletAddress = walletAccount.address!.toLowerCase();
      const walletType =
        walletAccount.wallet_client_type === "privy"
          ? "Embedded"
          : walletAccount.wallet_client_type || "External";

      const latestVerifiedAt = walletAccount.latest_verified_at
        ? new Date(walletAccount.latest_verified_at * 1000).toISOString()
        : user.last_seen_at || user.created_at;

      walletUsers.push({
        walletAddress,
        walletType,
        signInMethod,
        lastSeen: latestVerifiedAt,
        userId: user.id,
      });
    }
  }

  return walletUsers.sort((a, b) => {
    const dateA = new Date(a.lastSeen).getTime();
    const dateB = new Date(b.lastSeen).getTime();
    return dateB - dateA;
  });
}
