"use client";

import { NextPage } from "next";
import ManagePage from "@/components/ManagePage";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import TimelineProvider from "@/providers/TimelineProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Manage: NextPage = () => {
  const { connectedAddress } = useUserProvider();

  return (
    <TimelineProvider>
      <TimelineApiProvider artistAddress={connectedAddress?.toLowerCase()}>
        <ManagePage />
      </TimelineApiProvider>
    </TimelineProvider>
  );
};

export default Manage;
