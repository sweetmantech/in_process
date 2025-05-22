"use client";

import Feed from "./Feed";
import AltToggle from "./AltToggle";
import { useState } from "react";
import ArtistFeedProvider from "@/providers/ArtistFeedProvider";
import useIsMobile from "@/hooks/useIsMobile";
import MobileProfile from "./MobileProfile";
import DesktopProfile from "./DesktopProfile";

const ArtistPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const isMobile = useIsMobile();

  return (
    <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[400px] md:min-h-[550px]">
      <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
        {isMobile ? <MobileProfile /> : <DesktopProfile />}
        <AltToggle alt={alt} setAlt={setAlt} />
      </div>
      <div
        className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
      >
        <ArtistFeedProvider>
          <Feed alt={alt} />
        </ArtistFeedProvider>
      </div>
    </div>
  );
};

export default ArtistPage;
