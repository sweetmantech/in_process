"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const Moments = () => {
  const { artistWallet } = useUserProvider();

  return (
    <TimelineApiProvider artistAddress={artistWallet as Address} includeHidden={true} type="artist">
      <Collections />
    </TimelineApiProvider>
  );
};

export default Moments;
