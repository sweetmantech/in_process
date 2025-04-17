"use client";

import { useArtistProfile } from "@/hooks/useArtistProfile";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import Image from "next/image";

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
      className={`flex items-center px-4 py-2 bg-grey-moss-400 hover:bg-grey-moss-900 hover:shadow-[0px_1px_1px_1px_#0000002e] text-white font-archivo lowercase text-sm md:text-base rounded-xs md:rounded-sm ${className}`}
    >
      <div
        className={`w-2 h-2 rounded-full mr-2 ${connectedWallet ? "bg-grey-moss-100" : "border border-grey-moss-100"}`}
      />
      {connectedWallet
        ? `${data?.username || truncateAddress(connectedWallet as string)}`
        : "sign in"}
      {connectedWallet && (
        <Image
          src="/images/down-arrow.svg"
          alt="Menu"
          width={16}
          height={16}
          className="ml-6"
        />
      )}
    </button>
  );
}
