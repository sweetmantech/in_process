"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import truncated from "@/lib/truncated";
import { useUserProvider } from "@/providers/UserProvider";

interface PrivyButtonProps {
  className?: string;
}

export function PrivyButton({ className = "" }: PrivyButtonProps) {
  const { login, ready } = usePrivy();
  const { privyWallet } = useConnectedWallet();
  const { toggleNavbar, isOpenNavbar } = useLayoutProvider();
  const { profile } = useUserProvider();

  if (!ready) return null;

  const handleClick = async () => {
    if (!privyWallet) {
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
        isOpenNavbar ? "rounded-b-none md:rounded-t-sm" : "md:rounded-sm"
      } font-archivo text-sm lowercase text-white md:bg-grey-moss-400 md:text-base md:hover:bg-grey-moss-900 md:hover:shadow-[0px_1px_1px_1px_#0000002e] ${className}`}
    >
      <div className="flex items-center gap-2 rounded-md bg-grey-moss-400 px-2 md:px-4 py-2 md:bg-transparent">
        <div
          className={`h-2 w-2 rounded-full ${privyWallet ? "bg-grey-moss-100" : "border border-grey-moss-100"}`}
        />
        {privyWallet ? (
          <>
            <p className="min-w-20 text-left">
              {truncated(profile?.username || "", 9) ||
                truncateAddress(privyWallet.address as string)}
            </p>
            <Image
              src="/images/down-arrow.svg"
              alt="Menu"
              width={16}
              height={16}
              className={`ml-8 hidden transition-transform duration-200 md:block ${isOpenNavbar ? "rotate-180" : ""}`}
            />
          </>
        ) : (
          "sign in"
        )}
      </div>
    </button>
  );
}
