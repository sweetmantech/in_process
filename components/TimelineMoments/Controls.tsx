import { useTimelineAnimationProvider } from "@/providers/TimelineAnimationProvider";
import React from "react";
import { ArrowRight } from "../ui/icons";

const Controls = () => {
  const { activeIndex, swiper, momentEnded, timelineOverflowed } = useTimelineAnimationProvider();

  return (
    <div className="absolute left-0 top-0 z-[999999] flex size-full items-center justify-between px-1">
      {activeIndex > 1 && (
        <button className="text-black" type="button" onClick={() => swiper?.slidePrev()}>
          <ArrowRight className="h-6 w-6 rotate-[-180deg]" />
        </button>
      )}
      {timelineOverflowed && !momentEnded && (
        <button
          className="ml-auto p-1 text-black"
          type="button"
          onClick={() => swiper?.slideNext()}
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Controls;
