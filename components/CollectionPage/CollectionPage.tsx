"use client";

import AltToggle from "../ArtistPage/AltToggle";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import MobileProfile from "./MobileProfile";
import DesktopProfile from "./DesktopProfile";
import { useParams } from "next/navigation";
import CollectionTimeline from "./CollectionTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";

const CollectionPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const isMobile = useIsMobile();
  const params = useParams();
  const collectionAddress = params.collectionAddress as string;
  // eslint-disable-next-line
  const [_, address] = collectionAddress.split("%3A");

  return (
    <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[450px] md:min-h-[550px]">
      <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
        {isMobile ? <MobileProfile /> : <DesktopProfile />}
        <AltToggle alt={alt} setAlt={setAlt} />
      </div>
      <div
        className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
      >
        <TimelineProvider collectionAddress={address}>
          <CollectionTimeline alt={alt} />
        </TimelineProvider>
      </div>
    </div>
  );
};

export default CollectionPage;
