"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function useSignedAddress() {
  const { authenticated, user } = usePrivy();

  if (!authenticated || !user) {
    return null;
  }

  // Get wallet address from Privy user
  const wallet = user.wallet;
  return wallet?.address || null;
}
