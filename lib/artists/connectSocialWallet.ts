import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const connectSocialWallet = async (accessToken: string, artist_wallet: Address) => {
  const response = await fetch(`${IN_PROCESS_API}/artists/wallets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ artist_wallet }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `HTTP ${response.status}`;
    throw new Error(message);
  }
  return data;
};

export default connectSocialWallet;
