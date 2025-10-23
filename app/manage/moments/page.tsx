"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { Address } from "viem";

const Moments = () => {
  const { artistWallet } = useUserProvider();
  const { getAccessToken } = usePrivy();
  const init = async () => {
    const accessToken = await getAccessToken();
    console.log("ziad here", accessToken);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <TimelineApiProvider artistAddress={artistWallet as Address} includeHidden={true}>
      <Collections />
    </TimelineApiProvider>
  );
};

export default Moments;
