"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const Moments = () => {
  const { connectedAddress, artistWallet } = useUserProvider();

  return (
    <TimelineApiProvider artistAddress={(artistWallet || connectedAddress) as Address} includeHidden={true}>
      <Collections />
    </TimelineApiProvider>
  );
};

export default Moments;
