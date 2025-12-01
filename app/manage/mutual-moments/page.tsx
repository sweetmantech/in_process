"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const MutualMoments = () => {
  const { artistWallet } = useUserProvider();

  return (
    <TimelineProvider artistAddress={artistWallet as Address} includeHidden={true} type="mutual">
      <Collections />
    </TimelineProvider>
  );
};

export default MutualMoments;
