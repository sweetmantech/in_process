"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import SignToInProcess from "@/components/ManagePage/SignToInProcess";
import { useRouter } from "next/navigation";

const ManagePage = ({ children }: { children: ReactNode }) => {
  const { context } = useFrameProvider();
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const { ready } = usePrivy();
  const [loaded, setLoaded] = useState<boolean>(false);
  const signedWallet = context ? address : connectedWallet;
  const { push } = useRouter();

  useEffect(() => {
    if (ready)
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
  }, [ready]);

  if (!loaded) return <Fragment />;
  if (!signedWallet) return <SignToInProcess />;

  return (
    <main className="w-screen flex flex-col grow pt-10 md:pt-16 grid grid-cols-12 gap-4 md:gap-6 px-6 md:px-8">
      <div className="col-span-12 md:col-span-3 flex flex-col gap-2">
        <button
          type="button"
          className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
          onClick={() => push("/manage/account")}
        >
          <p className="text-base md:text-2xl">account</p>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
          onClick={() => push("/manage/payment")}
        >
          <p className="text-base md:text-2xl">payment</p>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
        >
          <p className="text-base md:text-2xl">moments</p>
          <ArrowRight className="size-4" />
        </button>
      </div>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </main>
  );
};

export default ManagePage;
