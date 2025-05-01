"use client";

import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { useFrameProvider } from "@/providers/FrameProvider";
import { config } from "@/providers/WagmiProvider";
import { useAccount, useConnect } from "wagmi";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import truncated from "@/lib/truncated";

interface WarpcastButtonProps {
  className?: string;
}
export function WarpcastButton({ className = "" }: WarpcastButtonProps) {
  const { context } = useFrameProvider();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { toggleNavbar, isOpenNavbar } = useLayoutProvider();

  const handleClick = async () => {
    if (isConnected) {
      toggleNavbar();
      return;
    }
    connect({ connector: config.connectors[0] });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3 py-2 ${
        isOpenNavbar
          ? "bg-grey-moss-900 rounded-t-xs md:rounded-t-sm rounded-b-none"
          : "bg-grey-moss-400 hover:bg-grey-moss-900 hover:shadow-[0px_1px_1px_1px_#0000002e] rounded-xs md:rounded-sm"
      } text-white font-archivo lowercase text-sm md:text-base ${className}`}
    >
      <div className="flex items-center">
        <div
          className={`w-2 h-2 rounded-full mr-2 ${isConnected ? "bg-grey-moss-100" : "border border-grey-moss-100"}`}
        />
        {isConnected ? (
          <p className="min-w-20 text-left">
            {truncated(context?.user.displayName || "", 9) ||
              truncateAddress(address as string)}
          </p>
        ) : (
          "sign in"
        )}
        {isConnected && (
          <Image
            src="/images/down-arrow.svg"
            alt="Menu"
            width={16}
            height={16}
            className={`ml-8 transition-transform duration-200 ${isOpenNavbar ? "rotate-180" : ""}`}
          />
        )}
      </div>
    </button>
  );
}
