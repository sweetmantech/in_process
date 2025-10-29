export interface WalletUser {
  walletAddress: string;
  walletType: string;
  signInMethod: "email_then_wallet" | "wallet_direct";
  lastSeen: string;
  userId: string;
}
