"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import BackToTimeline from "./BackToTimeline";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import MomentCollected from "@/components/MomentPage/MomentCollected";
import MomentDetails from "./MomentDetails";

const Moment = () => {
  const { metadata } = useMomentProvider();
  const { collected } = useMomentCollectProvider();

  return (
    <div className="w-full">
      <BackToTimeline />
      <div className="relative flex flex-col gap-10 px-3 pb-20 md:flex-row md:px-10">
        {metadata && <>{collected ? <MomentCollected /> : <MomentDetails />}</>}
      </div>
    </div>
  );
};

export default Moment;
