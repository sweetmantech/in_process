"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";

interface LoginButtonProps {
  className?: string;
}
export function LoginButton({ className = "" }: LoginButtonProps) {
  const { login, ready, authenticated, logout } = usePrivy();
  const { connectedWallet } = useConnectedWallet();

  if (!ready) return null;

  return (
    <button
      onClick={authenticated ? logout : login}
      className={`px-4 py-3 bg-red-dark text-white font-grotesk-light text-xl rounded-lg hover:opacity-90 transition-opacity ${className}`}
    >
      {authenticated
        ? `${truncateAddress(connectedWallet as string)}`
        : "Connect Wallet"}
    </button>
  );
}
