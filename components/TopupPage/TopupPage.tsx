"use client";

import { Deposit } from "./Deposit";
import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { Fragment, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { UsdcBalance } from "../Balances/UsdcBalance";
import { EthBalance } from "../Balances/EthBalance";
import { useSocialWalletBalanceProvider } from "@/providers/SocialWalletBalanceProvider";
import { Address } from "viem";
import { Wallet } from "../Balances/Wallet";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

const TopupPage = () => {
  const { connectedAddress } = useUserProvider();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { ready } = usePrivy();
  const { isLoading, balance: usdcBalance, ethBalance } = useSocialWalletBalanceProvider();
  const { smartWallet } = useSmartWalletProvider();

  useEffect(() => {
    if (ready)
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
  }, [ready]);

  if (!loaded) return <Fragment />;
  if (!connectedAddress) return <SignToInProcess />;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-balance font-archivo-bold text-4xl tracking-tight text-grey-moss-900">
            Top Up Wallet
          </h1>
          <p className="text-pretty font-spectral-italic text-grey-primary">
            Manage your digital assets and view your current balance
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Wallet address={smartWallet as Address} title="Smart Wallet" />
          <div className="space-y-6">
            <UsdcBalance isLoading={isLoading} balance={usdcBalance} />
            <EthBalance isLoading={isLoading} balance={ethBalance} />
          </div>
        </div>
        <Deposit />
      </div>
    </main>
  );
};

export default TopupPage;
