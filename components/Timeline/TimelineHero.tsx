import React from "react";
import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

const TimelineHero = () => {
  return (
    <div className="pb-6 pt-12 md:flex md:items-start md:justify-between md:gap-8 md:pb-8 md:pt-16 lg:gap-12 lg:pb-12 lg:pt-20">
      {/* Description Text - Centered on mobile, left on desktop */}
      <div className="text-center md:max-w-2xl md:flex-1 md:text-left">
        <h1 className="font-archivo text-2xl leading-tight tracking-[-1px] text-black md:text-4xl lg:text-5xl">
          a collective timeline
        </h1>
        <p className="mt-1 font-spectral-italic text-2xl leading-tight tracking-[-1px] text-black md:mt-2 md:text-4xl lg:text-5xl">
          for artists
        </p>
      </div>

      {/* Desktop: Moments Count + Create Button (Right side) */}
      <div className="hidden flex-col items-end md:flex md:min-w-fit md:flex-shrink-0">
        <MomentCount />
        <div className="mt-2 md:mt-3">
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default TimelineHero;
