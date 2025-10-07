"use client";

import AltToggle from "./AltToggle";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import MobileProfile from "./MobileProfile";
import DesktopProfile from "./DesktopProfile";
import { useParams } from "next/navigation";
import TimelineFeed from "./TimelineFeed";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import ProfileProvider from "@/providers/ProfileProvider";
import { Address } from "viem";

const ArtistPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const isMobile = useIsMobile();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  return (
    <ProfileProvider address={artistAddress as Address}>
      <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[450px] md:min-h-[550px]">
        <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
          {isMobile ? <MobileProfile /> : <DesktopProfile />}
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
        <div
          className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
        >
          <TimelineApiProvider artistAddress={address}>
            <TimelineFeed alt={alt} />
          </TimelineApiProvider>
        </div>
      </div>
    </ProfileProvider>
  );
};

export default ArtistPage;
