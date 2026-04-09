import sdk from "@farcaster/frame-sdk";
import { IN_PROCESS_API } from "@/lib/consts";
import { getTimeNonce } from "./getTimeNonce";

const STORAGE_KEY = "fc_token";

export const getFarcasterToken = async (): Promise<string> => {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) return cached; // no expiry — reuse indefinitely

  // sign-in modal shown only once
  const { message, signature } = await sdk.actions.signIn({
    nonce: getTimeNonce(),
    expirationTime: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toISOString(),
  });

  const res = await fetch(`${IN_PROCESS_API}/farcaster/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });

  if (!res.ok) throw new Error("Farcaster authentication failed");

  const { token } = await res.json();
  localStorage.setItem(STORAGE_KEY, token);
  return token;
};
