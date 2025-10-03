"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import SignToInProcess from "./SignToInProcess";
import { usePrivy } from "@privy-io/react-auth";
import { Fragment, useEffect, useState } from "react";
import Collections from "./Collections";
import TotalEarnings from "../LoginButton/TotalEarnings";
import ManagePagePaymentsAccordion from "./ManagePagePaymentsAccordion";
import LinkWalletButton from "./LinkWalletButton";

const ManagePage = () => {
  const { context } = useFrameProvider();
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const { ready } = usePrivy();
  const [loaded, setLoaded] = useState<boolean>(false);
  const signedWallet = context ? address : connectedWallet;

  useEffect(() => {
    if (ready)
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
  }, [ready]);

  if (!loaded) return <Fragment />;
  if (!signedWallet) return <SignToInProcess />;
  return (
    <div className="w-screen flex flex-col grow pt-10 md:pt-16">
      <div className="px-6 md:px-8 pb-6">
        <div className="flex items-center gap-4">
          <h2 className=" text-2xl md:text-3xl font-archivo">total earnings</h2>
          <TotalEarnings className="text-2xl md:text-3xl font-spectral text-grey-moss-900" />
        </div>
        <p className="text-grey-moss-300 text-sm mt-2">
          Note: Earnings calculation is being improved and may not reflect
          accurate totals
        </p>
        <LinkWalletButton />
      </div>
      <ManagePagePaymentsAccordion address={signedWallet} />
      <Collections />
    </div>
  );
};

export default ManagePage;
