"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Moments = () => {
  const { connectedAddress } = useUserProvider();

  return (
    <TimelineApiProvider artistAddress={connectedAddress?.toLowerCase()} includeHidden={true}>
      <Collections />
    </TimelineApiProvider>
  );
};

export default Moments;
