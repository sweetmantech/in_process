import React from "react";
import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

const TimelineHero = () => {
  return (
    <div className="pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-20 lg:pb-12 md:flex md:justify-between md:items-start md:gap-8 lg:gap-12">
      {/* Description Text - Centered on mobile, left on desktop */}
      <div className="text-center md:text-left md:flex-1 md:max-w-2xl">
        <h1 className="font-archivo text-2xl md:text-4xl lg:text-5xl tracking-[-1px] text-black leading-tight">
          a collective timeline
        </h1>
        <p className="font-spectral-italic text-2xl md:text-4xl lg:text-5xl tracking-[-1px] text-black mt-1 md:mt-2 leading-tight">
          for artists
        </p>
      </div>

      {/* Desktop: Moments Count + Create Button (Right side) */}
      <div className="hidden md:flex flex-col items-end md:flex-shrink-0 md:min-w-fit">
        <MomentCount />
        <div className="mt-2 md:mt-3">
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default TimelineHero;
