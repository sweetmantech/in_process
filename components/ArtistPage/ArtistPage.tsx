"use client";

import Feed from "./Feed";
import AltToggle from "./AltToggle";
import { useState } from "react";
import ArtistProfile from "./ArtistProfile";
import { useProfileProvider } from "@/providers/ProfileProvider";
import EditingStatus from "./EditingStatus";
import ArtistFeedProvider from "@/providers/ArtistFeedProvider";

const ArtistPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const { isEditing } = useProfileProvider();

  return (
    <div className="w-screen grow flex flex-col pt-24 relative">
      <div className="relative">
        {isEditing && <EditingStatus />}
        <div className="flex justify-between px-2 md:px-10 items-start pb-2">
          <ArtistProfile />
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
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
