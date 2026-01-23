"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSocialSmartWalletsBalancesProvider } from "@/providers/SocialSmartWalletsBalancesProvider";

export function TotalBalances() {
  const { isLoading, totalEthBalance, totalUsdcBalance } = useSocialSmartWalletsBalancesProvider();
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card>
        <CardContent className="pt-3 pb-3">
          <div className="space-y-0.5">
            <p className="text-xs font-spectral-italic text-grey-secondary">Total ETH Balance</p>
            <p className="text-base font-archivo-bold text-grey-moss-900">
              {isLoading ? "Loading..." : `${totalEthBalance} ETH`}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-3 pb-3">
          <div className="space-y-0.5">
            <p className="text-xs font-spectral-italic text-grey-secondary">Total USDC Balance</p>
            <p className="text-base font-archivo-bold text-grey-moss-900">
              {isLoading ? "Loading..." : `${totalUsdcBalance} USDC`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
