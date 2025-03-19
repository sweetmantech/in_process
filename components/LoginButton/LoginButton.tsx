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
      type="button"
      onClick={authenticated ? logout : login}
      className={`px-3 py-2 bg-red-dark hover:bg-red hover:shadow-[0px_1px_1px_1px_#0000002e] text-white font-archivo lowercase text-sm md:text-base rounded-xs md:rounded-sm ${className}`}
    >
      {authenticated
        ? `${truncateAddress(connectedWallet as string)}`
        : "connect wallet"}
    </button>
  );
}
