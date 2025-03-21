"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";

interface LoginButtonProps {
  className?: string;
}
export function LoginButton({ className = "" }: LoginButtonProps) {
  const { login, ready, logout, authenticated, user, linkWallet } = usePrivy();
  const { connectedWallet } = useConnectedWallet();

  if (!ready) return null;

  const handleClick = async () => {
    if (!connectedWallet) {
      if (authenticated && user?.linkedAccounts?.[0]?.type === "wallet")
        linkWallet();
      else login();
      return;
    }
    logout();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3 py-2 bg-red-dark hover:bg-red hover:shadow-[0px_1px_1px_1px_#0000002e] text-white font-archivo lowercase text-sm md:text-base rounded-xs md:rounded-sm ${className}`}
    >
      {connectedWallet
        ? `${truncateAddress(connectedWallet as string)}`
        : "connect wallet"}
    </button>
  );
}
