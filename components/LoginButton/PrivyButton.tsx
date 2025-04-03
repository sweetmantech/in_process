"use client";

import { useArtistProfile } from "@/hooks/useArtistProfile";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";

interface PrivyButtonProps {
  className?: string;
}
export function PrivyButton({ className = "" }: PrivyButtonProps) {
  const { login, ready, logout } = usePrivy();
  const { connectedWallet } = useConnectedWallet();
  const { data } = useArtistProfile(connectedWallet as Address);

  if (!ready) return null;

  const handleClick = async () => {
    if (!connectedWallet) {
      login();
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
        ? `${data?.username || truncateAddress(connectedWallet as string)}`
        : "connect wallet"}
    </button>
  );
}
