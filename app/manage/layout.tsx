"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import SignToInProcess from "@/components/ManagePage/SignToInProcess";

const ManagePage = ({ children }: { children: ReactNode }) => {
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
    <main className="w-screen flex flex-col grow pt-10 md:pt-16 grid grid-cols-12 gap-6 px-6 md:px-8">
      <div className="col-span-3 flex flex-col gap-2">
        <button
          type="button"
          className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
        >
          <p>account</p>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
        >
          <p>payment</p>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
        >
          <p>moments</p>
          <ArrowRight className="size-4" />
        </button>
      </div>
      <div className="col-span-9">{children}</div>
    </main>
  );
};

export default ManagePage;
