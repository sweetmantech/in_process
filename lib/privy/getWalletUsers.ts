import { type User } from "@privy-io/node";
import { type WalletUser } from "@/types/wallet";

// API responses may return dates as strings while SDK types use numbers
type PrivyUser = User & {
  // API responses may have string dates even though SDK types use numbers
  created_at?: string | number;
};

// Type guard for wallet accounts
type WalletLinkedAccount =
  | User.LinkedAccountEthereum
  | User.LinkedAccountEthereumEmbeddedWallet
  | User.LinkedAccountSolana
  | User.LinkedAccountSolanaEmbeddedWallet
  | User.LinkedAccountBitcoinSegwitEmbeddedWallet
  | User.LinkedAccountBitcoinTaprootEmbeddedWallet;

function isWalletAccount(account: User["linked_accounts"][number]): account is WalletLinkedAccount {
  return account.type === "wallet" && "address" in account;
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
    const walletAccounts = user.linked_accounts.filter(isWalletAccount);

    const hasEmail = user.linked_accounts.some((account) => account.type === "email");

    const signInMethod: "email_then_wallet" | "wallet_direct" = hasEmail
      ? "email_then_wallet"
      : "wallet_direct";

    for (const walletAccount of walletAccounts) {
      const walletAddress = walletAccount.address.toLowerCase();
      const walletType =
        walletAccount.wallet_client_type === "privy"
          ? "Embedded"
          : walletAccount.wallet_client_type || "External";

      const latestVerifiedAt = walletAccount.latest_verified_at
        ? new Date(walletAccount.latest_verified_at * 1000).toISOString()
        : typeof user.created_at === "number"
          ? new Date(user.created_at).toISOString()
          : user.created_at || new Date().toISOString();

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
