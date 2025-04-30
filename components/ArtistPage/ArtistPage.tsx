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
    <div className="w-screen grow flex flex-col pt-6 md:pt-24 relative">
      <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
        {isMobile ? <MobileProfile /> : <DesktopProfile />}
        <AltToggle alt={alt} setAlt={setAlt} />
      </div>
      <div
        className={`md:grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
      >
        <ArtistFeedProvider>
          <Feed alt={alt} />
        </ArtistFeedProvider>
      </div>
    </div>
  );
};

export default ArtistPage;
