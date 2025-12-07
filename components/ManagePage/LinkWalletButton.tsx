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
      className={`mt-4 rounded-sm !bg-grey-eggshell px-12 py-3 font-archivo text-lg text-black hover:!bg-grey-moss-100 ${className || ""}`}
      onClick={linkWallet}
    >
      connect wallet
    </Button>
  );
};

export default LinkWalletButton;
