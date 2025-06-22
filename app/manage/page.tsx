"use client";

import { NextPage } from "next";
import ManagePage from "@/components/ManagePage";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Manage: NextPage = () => {
  const { connectedAddress } = useUserProvider();

  return (
    <TimelineApiProvider
      artistAddress={connectedAddress?.toLowerCase()}
      includeHidden={true}
    >
      <ManagePage />
    </TimelineApiProvider>
  );
};

export default Manage;
