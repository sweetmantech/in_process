"use client";

import { Deposit } from "./Deposit";
import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { Fragment } from "react";
import { UsdcBalance } from "../Balances/UsdcBalance";
import { EthBalance } from "../Balances/EthBalance";
import { Address } from "viem";
import { Wallet } from "../Balances/Wallet";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { usePrivy } from "@privy-io/react-auth";

const TopupPage = () => {
  const { socialWalletAddress } = useUserProvider();
  const { ready } = usePrivy();
  const { smartWallet, isLoading, balance: usdcBalance, ethBalance } = useSmartWalletProvider();

  if (!ready) return <Fragment />;
  if (!socialWalletAddress) return <SignToInProcess />;

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
