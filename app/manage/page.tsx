"use client";

import { NextPage } from "next";
import ManagePage from "@/components/ManagePage";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const Manage: NextPage = () => {
  const { connectedAddress } = useUserProvider();

  return (
    <TimelineApiProvider
      artistAddress={connectedAddress?.toLowerCase() as Address}
    >
      <ManagePage />
    </TimelineApiProvider>
  );
};

export default Manage;
