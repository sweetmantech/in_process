import React from "react";
import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

interface TimelineHeroProps {
  totalCount: number;
}

const TimelineHero = ({ totalCount }: TimelineHeroProps) => {
  return (
    <div className="pt-12 pb-4 md:flex md:justify-between md:items-start">
      {/* Description Text - Centered on mobile, left on desktop */}
      <div className="text-center md:text-left">
        <h1 className="font-archivo text-2xl md:text-5xl tracking-[-1px] text-black">
          an onchain collective timeline
        </h1>
        <p className="font-spectral-italic text-2xl md:text-5xl tracking-[-1px] text-black mt-1">
          for artists
        </p>
      </div>
      
      {/* Desktop: Moments Count + Create Button (Right side) */}
      <div className="hidden md:flex flex-col items-end">
        <MomentCount count={totalCount} />
        <div className="mt-2">
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default TimelineHero;