"use client";

import { useLinkAccount } from "@privy-io/react-auth";

interface LinkWalletButtonProps {
  className?: string;
}

const LinkWalletButton = ({
  className = "mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
}: LinkWalletButtonProps) => {
  const { linkWallet } = useLinkAccount();

  return (
    <button onClick={linkWallet} className={className}>
      connect wallet
    </button>
  );
};

export default LinkWalletButton;
