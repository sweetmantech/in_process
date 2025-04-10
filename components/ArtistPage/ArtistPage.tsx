"use client";

import Feed from "./Feed";
import AltToggle from "./AltToggle";
import { useState } from "react";
import ArtistProfile from "./ArtistProfile";
import { useProfileProvider } from "@/providers/ProfileProvider";
import EditingStatus from "./EditingStatus";
import { useArtistCollections } from "@/hooks/useArtistCollections";
import FeedProvider from "@/providers/FeedProvider";

const ArtistPage = () => {
  const { data } = useArtistCollections();
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const { isEditing } = useProfileProvider();

  return (
    <div className="w-screen grow flex flex-col pt-16 md:pt-[20vh] relative">
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
        <FeedProvider collections={data || []}>
          <Feed alt={alt} />
        </FeedProvider>
      </div>
    </div>
  );
};

export default ArtistPage;
