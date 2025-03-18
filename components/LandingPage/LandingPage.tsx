"use client";

import Feeds from "./Feeds";

export default function LandingPage() {
  return (
    <div className="px-2 md:px-10 relative grow flex flex-col">
      <Feeds />
    </div>
  );
}

LandingPage.theme = "light";
