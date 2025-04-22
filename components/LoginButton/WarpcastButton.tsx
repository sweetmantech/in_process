"use client";

import { useState } from "react";
import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { useFrameProvider } from "@/providers/FrameProvider";
import { config } from "@/providers/WagmiProvider";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { DropdownMenu } from "./DropdownMenu";

interface WarpcastButtonProps {
  className?: string;
}
export function WarpcastButton({ className = "" }: WarpcastButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { context } = useFrameProvider();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClick = async () => {
    if (isConnected) {
      setShowDropdown(!showDropdown);
      return;
    }
    connect({ connector: config.connectors[0] });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-2 ${
          showDropdown
            ? "bg-grey-moss-900 rounded-t-xs md:rounded-t-sm rounded-b-none"
            : "bg-grey-moss-400 hover:bg-grey-moss-900 hover:shadow-[0px_1px_1px_1px_#0000002e] rounded-xs md:rounded-sm"
        } text-white font-archivo lowercase text-sm md:text-base ${className}`}
      >
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${isConnected ? "bg-grey-moss-100" : "border border-grey-moss-100"}`}
          />
          {isConnected
            ? `${context?.user.displayName || truncateAddress(address as string)}`
            : "sign in"}
          {isConnected && (
            <Image
              src="/images/down-arrow.svg"
              alt="Menu"
              width={16}
              height={16}
              className={`ml-8 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>
      {showDropdown && isConnected && (
        <DropdownMenu
          onLogout={() => {
            disconnect();
            setShowDropdown(false);
          }}
        />
      )}
    </div>
  );
}
