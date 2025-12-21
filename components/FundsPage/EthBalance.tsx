"use client";

import { Card } from "@/components/ui/card";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

export function EthBalance() {
  const { isLoading, ethBalance } = useSmartWalletProvider();

  return (
    <Card className="h-fit space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-grey-moss-100">
            <svg className="h-6 w-6 text-grey-moss-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.38-1.9 1.38-1.66 0-2.29-.77-2.4-1.9H6.1c.1 1.95 1.76 3.25 3.96 3.66V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
          </div>
          <div>
            <p className="font-archivo-medium text-sm text-grey-primary">ETH Balance</p>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {isLoading ? (
          <div className="h-12 w-48 animate-pulse rounded bg-grey-moss-100" />
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-spectral-bold text-4xl tracking-tight text-grey-moss-900">
              {parseFloat(ethBalance).toFixed(4)}
            </span>
            <span className="font-archivo-medium text-lg text-grey-primary">ETH</span>
          </div>
        )}
        <p className="font-archivo text-sm text-grey-secondary">Available for transactions</p>
      </div>
    </Card>
  );
}
