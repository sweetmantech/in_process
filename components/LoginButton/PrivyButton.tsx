"use client";

import { useArtistProfile } from "@/hooks/useArtistProfile";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import Image from "next/image";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import truncated from "@/lib/truncated";

interface PrivyButtonProps {
  className?: string;
}

export function PrivyButton({ className = "" }: PrivyButtonProps) {
  const { login, ready } = usePrivy();
  const { connectedWallet } = useConnectedWallet();
  const { data } = useArtistProfile(connectedWallet as Address);
  const { toggleNavbar, isOpenNavbar } = useLayoutProvider();

  if (!ready) return null;

  const handleClick = async () => {
    if (!connectedWallet) {
      login();
      return;
    }
    toggleNavbar();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center ${
        isOpenNavbar ? "md:rounded-t-sm rounded-b-none" : "md:rounded-sm"
      } md:bg-grey-moss-400 md:hover:bg-grey-moss-900 md:hover:shadow-[0px_1px_1px_1px_#0000002e] text-white font-archivo lowercase text-sm md:text-base ${className}`}
    >
      <div className="flex items-center gap-2 bg-grey-moss-400 md:bg-transparent px-4 py-2 rounded-md">
        <div
          className={`w-2 h-2 rounded-full ${connectedWallet ? "bg-grey-moss-100" : "border border-grey-moss-100"}`}
        />
        {connectedWallet ? (
          <>
            <p className="min-w-20 text-left">
              {truncated(data?.username || "", 9) ||
                truncateAddress(connectedWallet as string)}
            </p>
            <Image
              src="/images/down-arrow.svg"
              alt="Menu"
              width={16}
              height={16}
              className={`hidden md:block ml-8 transition-transform duration-200 ${isOpenNavbar ? "rotate-180" : ""}`}
            />
          </>
        ) : (
          "sign in"
        )}
      </div>
    </button>
  );
}
