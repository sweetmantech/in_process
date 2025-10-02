"use client";

import { useLinkAccount } from "@privy-io/react-auth";
import { Button } from "../ui/button";

interface LinkWalletButtonProps {
  className?: string;
}

const LinkWalletButton = ({ className }: LinkWalletButtonProps) => {
  const { linkWallet } = useLinkAccount();

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
