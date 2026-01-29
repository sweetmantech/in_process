"use client";

import { Withdraw } from "./Withdraw";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { Fragment } from "react";
import { UsdcBalance } from "../Balances/UsdcBalance";
import { EthBalance } from "../Balances/EthBalance";
import { useSocialWalletBalanceProvider } from "@/providers/SocialWalletBalanceProvider";
import { Wallet } from "../Balances/Wallet";
import { Address } from "viem";
import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "@/hooks/useConnectedWallet";

const FundsPage = () => {
  const { privyWallet } = useConnectedWallet();
  const { ready } = usePrivy();
  const { isLoading, balance: usdcBalance, ethBalance } = useSocialWalletBalanceProvider();

  if (!ready) return <Fragment />;
  if (!privyWallet?.address) return <SignToInProcess />;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-balance font-archivo-bold text-4xl tracking-tight text-grey-moss-900">
            Withdraw Funds
          </h1>
          <p className="text-pretty font-spectral-italic text-grey-primary">
            Withdraw your digital assets to your external wallet
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Wallet address={privyWallet.address as Address} title="Social Wallet" />
          <div className="space-y-6">
            <UsdcBalance isLoading={isLoading} balance={usdcBalance} />
            <EthBalance isLoading={isLoading} balance={ethBalance} />
          </div>
        </div>
        <Withdraw />
      </div>
    </main>
  );
};

export default FundsPage;
