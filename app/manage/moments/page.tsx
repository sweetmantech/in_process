"use client";

import Collections from "@/components/ManagePage/Collections";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";

const Moments = () => {
  return (
    <TimelineApiProvider>
      <Collections />
    </TimelineApiProvider>
  );
};

export default Moments;
