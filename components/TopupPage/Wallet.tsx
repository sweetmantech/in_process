"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { CHAIN_ID } from "@/lib/consts";

export function Wallet() {
  const [copied, setCopied] = useState(false);
  const { smartWallet } = useSmartWalletProvider();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(smartWallet);
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
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-grey-moss-100 flex items-center justify-center">
          <WalletIcon className="w-5 h-5 text-grey-moss-900" />
        </div>
        <div>
          <p className="text-sm font-archivo-medium text-grey-primary">Smart Wallet</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-grey-moss-100 rounded-lg border border-grey-moss-200">
          <p className="text-xs text-grey-secondary mb-2 font-archivo-medium">YOUR ADDRESS</p>
          <div className="flex items-center justify-between gap-2">
            <code className="text-sm font-spectral font-medium break-all text-grey-moss-900">
              {smartWallet}
            </code>
          </div>
        </div>

        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
          size="lg"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </>
          )}
        </Button>
      </div>

      <div className="pt-4 border-t border-grey-moss-100 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-grey-secondary font-archivo">Network</span>
          <span className="font-archivo-medium text-grey-moss-900">
            {getViemNetwork(CHAIN_ID).name}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-grey-secondary font-archivo">Short Address</span>
          <code className="font-spectral font-medium text-xs text-grey-moss-900">
            {formatAddress(smartWallet)}
          </code>
        </div>
      </div>
    </Card>
  );
}
