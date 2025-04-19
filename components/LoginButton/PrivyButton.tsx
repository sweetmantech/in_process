"use client";

import { useArtistProfile } from "@/hooks/useArtistProfile";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import Image from "next/image";
import { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";

interface PrivyButtonProps {
  className?: string;
}

export function PrivyButton({ className = "" }: PrivyButtonProps) {
  const { login, ready, logout } = usePrivy();
  const { connectedWallet } = useConnectedWallet();
  const { data } = useArtistProfile(connectedWallet as Address);
  const [isOpen, setIsOpen] = useState(false);

  if (!ready) return null;

  const handleClick = async () => {
    if (!connectedWallet) {
      login();
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center px-4 py-2 ${
          isOpen 
            ? 'bg-[#1C1C1C] rounded-t-xs md:rounded-t-sm rounded-b-none' 
            : 'bg-grey-moss-400 hover:bg-grey-moss-900 hover:shadow-[0px_1px_1px_1px_#0000002e] rounded-xs md:rounded-sm'
        } text-white font-archivo lowercase text-sm md:text-base ${className}`}
      >
        <div className={`w-2 h-2 rounded-full mr-2 ${connectedWallet ? 'bg-grey-moss-100' : 'border border-grey-moss-100'}`} />
        {connectedWallet ? (
          <>
            {data?.username || truncateAddress(connectedWallet as string)}
            <Image
              src="/images/down-arrow.svg"
              alt="Menu"
              width={16}
              height={16}
              className={`ml-8 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        ) : (
          "sign in"
        )}
      </button>

      {isOpen && connectedWallet && (
        <DropdownMenu onLogout={logout} />
      )}
    </div>
  );
}