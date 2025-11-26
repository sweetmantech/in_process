"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineApiProvider } from "@/providers/legacy/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const MutualMoments = () => {
  const { artistWallet } = useUserProvider();

  return (
    <TimelineApiProvider artistAddress={artistWallet as Address} includeHidden={true} type="mutual">
      <Collections />
    </TimelineApiProvider>
  );
};

export default MutualMoments;
