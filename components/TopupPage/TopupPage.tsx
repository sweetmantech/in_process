"use client";

import { Balance } from "./Balance";
import { Wallet } from "./Wallet";
import { Deposit } from "./Deposit";
import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { Fragment, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

const TopupPage = () => {
  const { connectedAddress } = useUserProvider();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { ready } = usePrivy();

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
          <h1 className="text-4xl font-archivo-bold tracking-tight text-balance text-grey-moss-900">
            Top Up Wallet
          </h1>
          <p className="text-grey-primary font-spectral-italic text-pretty">
            Manage your digital assets and view your current balance
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Wallet />
          <Balance />
        </div>
        <Deposit />
      </div>
    </main>
  );
};

export default TopupPage;
