"use client";

import Feed from "./Feed";
import AltToggle from "./AltToggle";
import { useState } from "react";
import ArtistProfile from "./ArtistProfile";

const ArtistPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");

  return (
    <div className="w-screen grow flex flex-col pt-16 md:pt-[20vh] relative">
      <div className="flex justify-between px-2 md:px-10 items-start pb-2">
        <ArtistProfile />
        <AltToggle alt={alt} setAlt={setAlt} />
      </div>
      <div
        className={`md:grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:mr-10"}`}
      >
        <Feed alt={alt} />
      </div>
    </div>
  );
};

export default ArtistPage;
