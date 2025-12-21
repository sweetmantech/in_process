"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import { Fragment, ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";
import SignToInProcess from "@/components/ManagePage/SignToInProcess";
import { useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvider";
import { useHasMutualMoments } from "@/hooks/useHasMutualMoments";
import MutualMomentsButton from "@/components/ManagePage/MutualMomentsButton";
import { useDelayedReady } from "@/hooks/useDelayedReady";

const ManagePage = ({ children }: { children: ReactNode }) => {
  const { context } = useFrameProvider();
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const loaded = useDelayedReady();
  const signedWallet = context ? address : connectedWallet;
  const { push } = useRouter();
  const { artistWallet } = useUserProvider();
  const { hasMutualMoments } = useHasMutualMoments(artistWallet);

  if (!loaded) return <Fragment />;
  if (!signedWallet) return <SignToInProcess />;

  return (
    <main className="flex grid w-screen grow grid-cols-12 flex-col gap-4 px-2 pt-10 md:gap-6 md:px-8 md:pt-16">
      <div className="col-span-12 flex flex-col gap-2 md:col-span-3">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-2 py-1 font-archivo-medium text-2xl hover:bg-grey-eggshell"
          onClick={() => push("/manage/account")}
        >
          <p className="text-base md:text-2xl">account</p>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-2 py-1 font-archivo-medium text-2xl hover:bg-grey-eggshell"
          onClick={() => push("/manage/payment")}
        >
          <p className="text-base md:text-2xl">payment</p>
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-2 py-1 font-archivo-medium text-2xl hover:bg-grey-eggshell"
          onClick={() => push("/manage/moments")}
        >
          <p className="text-base md:text-2xl">moments</p>
          <ArrowRight className="size-4" />
        </button>
        {hasMutualMoments && <MutualMomentsButton />}
      </div>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </main>
  );
};

export default ManagePage;
