"use client";

import Moments from "@/components/MomentsGrid/Moments";
import MomentsSkeleton from "@/components/MomentsGrid/MomentsSkeleton";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";
import SignToInProcess from "@/components/ManagePage/SignToInProcess";

const ManageMoments = () => {
  const { artistWallet, artistWalletLoaded } = useUserProvider();

  if (!artistWalletLoaded) return <MomentsSkeleton />;
  if (!artistWallet) return <SignToInProcess />;

  return (
    <TimelineProvider artistAddress={artistWallet as Address} includeHidden={true} type="default">
      <Moments />
    </TimelineProvider>
  );
};

export default ManageMoments;
