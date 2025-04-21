"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import SignToInProcess from "./SignToInProcess";
import { usePrivy } from "@privy-io/react-auth";
import { Fragment, useEffect, useState } from "react";
import Collections from "./Collections";

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
      <Collections />
    </div>
  );
};

export default ManagePage;
