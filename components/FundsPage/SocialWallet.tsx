"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Wallet as WalletIcon } from "lucide-react";
import { Fragment, useState } from "react";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { CHAIN_ID } from "@/lib/consts";
import { useUserProvider } from "@/providers/UserProvider";

export function SocialWallet() {
  const [copied, setCopied] = useState(false);
  const { connectedAddress } = useUserProvider();

  if (!connectedAddress) return <Fragment />;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(connectedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[v0] Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className="space-y-4 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-grey-moss-100">
          <WalletIcon className="h-5 w-5 text-grey-moss-900" />
        </div>
        <div>
          <p className="font-archivo-medium text-sm text-grey-primary">Social Wallet</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-grey-moss-200 bg-grey-moss-100 p-4">
          <p className="mb-2 font-archivo-medium text-xs text-grey-secondary">YOUR ADDRESS</p>
          <div className="flex items-center justify-between gap-2">
            <code className="break-all font-spectral text-sm font-medium text-grey-moss-900">
              {connectedAddress}
            </code>
          </div>
        </div>

        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex w-full items-center gap-2 rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
          size="lg"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Address
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2 border-t border-grey-moss-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-archivo text-grey-secondary">Network</span>
          <span className="font-archivo-medium text-grey-moss-900">
            {getViemNetwork(CHAIN_ID).name}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-archivo text-grey-secondary">Short Address</span>
          <code className="font-spectral text-xs font-medium text-grey-moss-900">
            {formatAddress(connectedAddress)}
          </code>
        </div>
      </div>
    </Card>
  );
}
