"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const Moments = () => {
  const { artistWallet } = useUserProvider();

  return (
    <TimelineProvider artistAddress={artistWallet as Address} includeHidden={true} type="artist">
      <Collections />
    </TimelineProvider>
  );
};

export default Moments;
