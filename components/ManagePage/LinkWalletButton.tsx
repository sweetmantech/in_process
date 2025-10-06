"use client";

import { useLinkAccount } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { useLinkedWallet } from "@/hooks/useLinkedWallet";
import LinkedWallet from "./LinkedWallet";

interface LinkWalletButtonProps {
  className?: string;
}

const LinkWalletButton = ({ className }: LinkWalletButtonProps) => {
  const { linkWallet } = useLinkAccount();
  const { walletAddress } = useLinkedWallet();

  if (walletAddress) return <LinkedWallet walletAddress={walletAddress} className={className} />;

  return (
    <Button
      className={`mt-4 !bg-grey-eggshell hover:!bg-grey-moss-100 text-black font-archivo text-lg py-3 px-12 rounded-sm ${className || ""}`}
      onClick={linkWallet}
    >
      connect wallet
    </Button>
  );
};

export default LinkWalletButton;
