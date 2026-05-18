import sdk from "@farcaster/miniapp-sdk";
import { IN_PROCESS_API } from "@/lib/consts";
import { getTimeNonce } from "./getTimeNonce";

export const getFarcasterToken = async (): Promise<string> => {
  const { message, signature } = await sdk.actions.signIn({
    nonce: getTimeNonce(),
  });

  const res = await fetch(`${IN_PROCESS_API}/farcaster/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });

  if (!res.ok) throw new Error("Farcaster authentication failed");

  const body = await res.json();
  if (typeof body.token !== "string" || body.token.trim().length === 0)
    throw new Error(`Farcaster auth returned invalid token: ${JSON.stringify(body)}`);
  return body.token;
};
