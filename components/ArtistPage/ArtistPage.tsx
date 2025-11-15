"use client";

import AltToggle from "./AltToggle";
import { useState, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import MobileProfile from "./MobileProfile";
import DesktopProfile from "./DesktopProfile";
import { useParams } from "next/navigation";
import TimelineFeed from "./TimelineFeed";
import { TimelineApiProvider } from "@/providers/TimelineApiProvider";
import ProfileProvider from "@/providers/ProfileProvider";
import { Address } from "viem";
import { useHasMutualMoments } from "@/hooks/useHasMutualMoments";

const ArtistPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const [showMutual, setShowMutual] = useState(false);
  const isMobile = useIsMobile();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  const hasMutualMoments = useHasMutualMoments(address);

  // Reset to regular view if mutual moments no longer exist
  useEffect(() => {
    if (!hasMutualMoments && showMutual) {
      setShowMutual(false);
    }
  }, [hasMutualMoments, showMutual]);

  return (
    <ProfileProvider address={artistAddress as Address}>
      <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[450px] md:min-h-[550px]">
        <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
          {isMobile ? <MobileProfile /> : <DesktopProfile />}
          <AltToggle
            alt={alt}
            setAlt={setAlt}
            showMutualButton={hasMutualMoments}
            mutualActive={showMutual}
            onMutualClick={() => setShowMutual(!showMutual)}
          />
        </div>
        <div
          className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
        >
          <TimelineApiProvider artistAddress={address} mutual={showMutual}>
            <TimelineFeed alt={alt} />
          </TimelineApiProvider>
        </div>
      </div>
    </ProfileProvider>
  );
};

export default ArtistPage;
