"use client";

import truncateAddress from "@/lib/truncateAddress";
import { useFrameProvider } from "@/providers/FrameProvider";
import { config } from "@/providers/WagmiProvider";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface WarpcastButtonProps {
  className?: string;
}
export function WarpcastButton({ className = "" }: WarpcastButtonProps) {
  const { context } = useFrameProvider();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClick = async () => {
    if (isConnected) {
      disconnect();
      return;
    }
    connect({ connector: config.connectors[0] });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3 py-2 bg-red-dark hover:bg-red hover:shadow-[0px_1px_1px_1px_#0000002e] text-white font-archivo lowercase text-sm md:text-base rounded-xs md:rounded-sm ${className}`}
    >
      {isConnected
        ? `${context?.user.displayName || truncateAddress(address as string)}`
        : "sign in"}
    </button>
  );
}
