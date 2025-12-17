"use client";

import AltToggle from "./AltToggle";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import MobileProfile from "./MobileProfile";
import DesktopProfile from "./DesktopProfile";
import { useParams } from "next/navigation";
import MomentsTimeline from "../Timeline/MomentsTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import ProfileProvider from "@/providers/ProfileProvider";
import { Address } from "viem";

const ArtistPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("grid");
  const isMobile = useIsMobile();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  return (
    <ProfileProvider address={artistAddress as Address}>
      <div className="relative grow flex w-screen flex-col overflow-hidden pb-20 pt-6 md:pt-10">
        <div className="relative flex items-start justify-between px-2 pb-2 md:px-10">
          {isMobile ? <MobileProfile /> : <DesktopProfile />}
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
        <div
          className={`flex grow flex-col px-2 md:px-0 ${alt === "timeline" && "md:px-10 md:pt-20"}`}
        >
          <TimelineProvider artistAddress={address}>
            <MomentsTimeline alt={alt} />
          </TimelineProvider>
        </div>
      </div>
    </ProfileProvider>
  );
};

export default ArtistPage;
